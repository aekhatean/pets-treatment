from this import d
from rest_framework import serializers
from .models import *
from django.contrib.auth import authenticate
from drf_extra_fields.fields import Base64ImageField
from rest_framework.authtoken.models import Token
from cryptography.fernet import Fernet
from .email_utils import send_mail_user
from clinics.serializers import ClinicSerializer
from django.db.models import Sum
import datetime
import django_filters
from rest_framework import serializers
class MyBase64ImageField(serializers.ImageField):
    """
    A Django REST framework field for handling image-uploads through raw post data.
    It uses base64 for encoding and decoding the contents of the file.

    Heavily based on
    https://github.com/tomchristie/django-rest-framework/pull/1268

    Updated for Django REST framework 3.
    """

    def to_internal_value(self, data):
        from django.core.files.base import ContentFile
        import base64
        import six
        import uuid

        if isinstance(data, six.string_types):
            if 'data:' in data and ';base64,' in data:
                header, data = data.split(';base64,')
            try:
                decoded_file = base64.b64decode(data)
            except TypeError:
                self.fail('invalid_image')

            file_name = str(uuid.uuid4())[:12]
            file_extension = self.get_file_extension(file_name, decoded_file)
            complete_file_name = "%s.%s" % (file_name, file_extension, )
            data = ContentFile(decoded_file, name=complete_file_name)
        return super().to_internal_value(data)

    def get_file_extension(self, file_name, decoded_file):
        import imghdr
        extension = imghdr.what(file_name, decoded_file)
        extension = "jpg" if extension == "jpeg" else extension

        return extension
class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True)
    email = serializers.EmailField(required=False)
    class Meta:
        model = User
        fields = ('id','username','first_name','last_name','email','password')
        read_only_fields = ['id']
    

    def update(self, instance, validated_data):
        for key in validated_data:
            if key in self.fields:
                if key != 'password':
                    setattr(instance,key,validated_data.get(key))
                else:
                    instance.set_password(validated_data.get(key))
        instance.save()
        return instance


class TokenSerializer(serializers.Serializer):
    email = serializers.CharField(
        write_only=True
    )
    password = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False,
        write_only=True
    )
    token = serializers.CharField(
        read_only=True
    )

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            user = authenticate(request=self.context.get('request'),
                                username=email, password=password)

            # The authenticate call simply returns None for is_active=False
            # users. (Assuming the default ModelBackend authentication
            # backend.)
            if not user:
                msg = 'Unable to log in with provided credentials.'
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = 'Must include "email" and "password".'
            raise serializers.ValidationError(msg, code='authorization')

        attrs['user'] = user
        return attrs


##### user public info ###############
class UserPublicInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name','last_name')

######### Public Profile Serialziers ##########
class ProfilePublicSerializer(serializers.ModelSerializer):
    picture = Base64ImageField(required=False)
    class Meta:
        model = Profile
        exclude = ['user']

######### Profile Serialziers ##########

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    picture = MyBase64ImageField(required=False)
    class Meta:
        model = Profile
        fields = '__all__'


    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data,is_active=False)
        profile= Profile.objects.create(**validated_data,user=user)
        return profile

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user')
        user_serializer = UserSerializer(instance.user,data=user_data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()

        user_picture = validated_data.pop('picture')
        if user_picture:
            instance.picture = user_picture
            
            
        for key in validated_data:
            if key in self.fields:
                    setattr(instance,key,validated_data.get(key))
        instance.save()
        return instance
        

######### doctor serialziers ##########
class SpecializationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialization
        fields = ('name',)

class DoctorSerializer(serializers.ModelSerializer):
    syndicate_id=Base64ImageField(required=False)
    specialization=SpecializationSerializer(many=True)
    clinics = ClinicSerializer(many=True,required=False)
    profile = ProfileSerializer()
    average_rate = serializers.SerializerMethodField('calc_average_rate')
    def calc_average_rate(self, doctor):
        try:
            average_rate = DoctorRating.objects.filter(doctor=doctor).aggregate(Sum('rating')).get('rating__sum') / DoctorRating.objects.filter(doctor=doctor).count()
            return average_rate
        except:
            return 0 

    class Meta:
        model = Doctor
        fields = ('id','is_varified','description','syndicate_id','national_id','specialization','profile','clinics','average_rate')
        read_only_fields = ['is_varified']
        depth = 1


    def create(self, validated_data):
        # print(1, validated_data)
        specialization_data = validated_data.pop('specialization')
        # print(2, validated_data)
        profile = validated_data.pop('profile')
        profile_serializer = ProfileSerializer(data=profile)
        print(profile.get('picture'))
        profile_serializer.is_valid(raise_exception=True)
        profile = profile_serializer.save()
        doctor = Doctor.objects.create(user=profile.user,profile=profile,**validated_data)
        for spec in specialization_data:
            spec_inst = Specialization.objects.get(name=dict(spec)['name'])
            Doctor.objects.get(user=profile.user).specialization.add(spec_inst)
        
        token, created = Token.objects.get_or_create(user=doctor.user)
        key = Fernet.generate_key()
        fernet = Fernet(key)
        enc_token = fernet.encrypt(token.key.encode())
        activation_link = f"http://127.0.0.1:8000/users/activate/{key.decode()}/{enc_token.decode()}"
        send_mail_user(doctor.user.first_name,activation_link,doctor.user.email)
        newdoctor = Doctor.objects.get(user=profile.user)
        return newdoctor

    def update(self, instance, validated_data):
        specialization_data = validated_data.pop('specialization')
        Doctor.objects.get(id=instance.id).specialization.clear()
        for spec in specialization_data:
            spec_inst = Specialization.objects.get(name=dict(spec)['name'])
            Doctor.objects.get(id=instance.id).specialization.add(spec_inst)
        profile_data = validated_data.pop('profile')
        profile_serializer = ProfileSerializer(instance.profile,data=profile_data)
        profile_serializer.is_valid(raise_exception=True)
        profile = profile_serializer.save()
        Doctor.objects.update(id=instance.id,**validated_data)
        updatedoctor = Doctor.objects.get(id=instance.id)
        return updatedoctor

        


class DoctorPublicSerializer(serializers.ModelSerializer):
    user = UserPublicInfoSerializer()
    profile=ProfilePublicSerializer()
    average_rate = serializers.SerializerMethodField('calc_average_rate')
    # first_name=user.fields.get("first_name")
    def calc_average_rate(self, doctor):
        try:
            average_rate = DoctorRating.objects.filter(doctor=doctor).aggregate(Sum('rating')).get('rating__sum') / DoctorRating.objects.filter(doctor=doctor).count()
            return average_rate
        except:
            return 0 
    class Meta:
        model = Doctor
        fields = ('id','user','description','profile','specialization','clinics','average_rate')
        depth = 1

class DoctorClinicsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorClinics
        fields = '__all__'
        depth = 1

class DoctorRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorRating
        fields = '__all__'
        depth = 1
######### doctor serialziers ##########
class ScheduleSerializer(serializers.ModelSerializer):
    date = serializers.SerializerMethodField('calc_date')

    def calc_date(self, schedule):
        weekdays_dict = {
            "Monday":0,
            "Tuesday":1,
            "Wednesday":2,
            "Thursday":3,
            "Friday":4,
            "Saturday":5,
            "Sunday":6
        }
        days_ahead = weekdays_dict[schedule.day] - datetime.date.today().weekday()
        if days_ahead < 0: 
            days_ahead += 7
        return datetime.date.today() + datetime.timedelta(days_ahead)
    class Meta:
        model = Schedule
        fields = ('id','from_time','to_time','day',
        'appointment_duration','doctor','clinic','active','date')
######### Appointment serialziers ##########
class AppointmentSerializer(serializers.ModelSerializer):
    doctor = serializers.CharField(source='schedule.doctor', required = False)
    clinic = serializers.CharField(source='schedule.clinic.name', required = False)
    address = serializers.SerializerMethodField('get_full_address')

    def get_full_address(self, obj):
        schedule_id = self.context.get('request').data.get('schedule')
        schedule = Schedule.objects.filter(id=schedule_id)[0]
        return f'{schedule.clinic.address}, {schedule.clinic.area}, {schedule.clinic.city}'

    class Meta:
        model = Appiontments
        fields = ('id', 'user', 'schedule', 'visiting_time', 'doctor', 'clinic', 'address', 'date')
        depth = 1

    def create(self, validated_data):
        schedule_id = self.context.get('request').data.get('schedule')
        user_id = self.context.get('request').data.get('user')
        schedule = Schedule.objects.filter(id=schedule_id)[0]
        user = User.objects.filter(id=user_id)[0]
        appointment = Appiontments.objects.create(**validated_data, schedule=schedule, user=user)
        print(appointment, "hello")
        return appointment
        
        
#////////////

# class DoctorEventFilter(django_filters.FilterSet):
#     class Meta:
#         model = Doctor
#         #use __ (double underscore) to target foreign key values
#         fields = ['user__eventName', 'event__startDate','event__endDate','event__address']