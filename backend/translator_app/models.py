from django.db import models

# Create your models here.
class Translation(models.Model):
    source_language = models.CharField(max_length=10)
    target_language = models.CharField(max_length=10)
    input_text = models.TextField()
    translated_text = models.TextField()

class Languages(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=10)

    def __str__(self):
        return self.name