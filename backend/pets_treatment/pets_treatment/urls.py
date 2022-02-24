from django.contrib import admin
from django.urls import path,include
from pets_treatment import settings
from django.conf.urls.static import static
from rest_framework import routers

router = routers.DefaultRouter()

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('users.urls')),
    path('clinics/', include('clinics.urls')),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)