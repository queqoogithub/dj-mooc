from django.contrib import admin
from .models import Course,CourseSection,Sector,Comment,Episode

admin.site.register(Course)
admin.site.register(CourseSection)

admin.site.register(Sector)
admin.site.register(Comment)
admin.site.register(Episode)