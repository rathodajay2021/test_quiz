from django.http import HttpResponse
from django.shortcuts import render

def homepage(request):
    return render(request, 'test_login_page.html')

def question1(request):
    return render(request, 'question1.html')

def result(request):
    return render(request, 'result.html')
