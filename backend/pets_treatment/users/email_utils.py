import smtplib
from email.utils import formataddr
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from django.template.loader import render_to_string
from pets_treatment import settings
    
def send_mail_user(fname,link,to_email):
    msg=MIMEMultipart('alternative')
    msg['From']=formataddr(('Petsania', settings.EMAIL_HOST_USER))
    msg['To']=to_email
    msg['Subject']='Petsania Account Activation'
    
    html_email = render_to_string("activation_user_email.html", {'first_name': fname,'activation_link': link})
    html_part = MIMEText(html_email, 'html')
    msg.attach(html_part)
    msg_str=msg.as_string()

    server=smtplib.SMTP(host=settings.EMAIL_HOST,port=settings.EMAIL_PORT)
    server.ehlo()
    server.starttls()
    server.login(settings.EMAIL_HOST_USER,settings.EMAIL_HOST_PASSWORD)
    server.sendmail(from_addr=msg['From'],to_addrs=to_email,msg=msg_str)
    server.quit()