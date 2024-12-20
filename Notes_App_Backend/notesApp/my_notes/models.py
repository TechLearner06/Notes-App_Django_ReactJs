from django.db import models
from django.utils.text import slugify

# Create your models here.

class Note(models.Model):

    CATEGORY = (('BUSINESS', 'Business'),
                ('PERSONAL', 'Personal'),
                ('IMPORTANT', 'Important'),)



    title = models.CharField(max_length=100)
    description = models.TextField()
    slug = models.SlugField(unique=True,blank=True,null=True)
    category=models.CharField(max_length=15,choices=CATEGORY,default='PERSONAL')
    created= models.DateTimeField(auto_now_add=True)
    updated=models.DateTimeField(auto_now=True)


    def save(self,*args ,**kwargs):

        if not self.slug:
            #Generate initial slug
            slug_title = slugify(self.title)
            slug=slug_title

            #check if the slug id unique and modify it if necessary
            if Note.objects.filter(slug=slug).exists():
                slug=f'{slug_title}-{get_random_string(5)}'
            self.slug=slug

        super(Note,self).save(*args,**kwargs)
