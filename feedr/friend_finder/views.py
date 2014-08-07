import json
from django.contrib.auth.decorators import login_required
from django.shortcuts import render

# Create your views here.
import facebook


def home(request):
    return render(request, 'home.html')


@login_required
def profile(request):
    user_social_auth = request.user.social_auth.filter(provider='facebook').first()
    graph = facebook.GraphAPI(user_social_auth.extra_data['access_token'])
    profile_data = graph.get_object("me")
    profile_picture = graph.get_object('me/picture', width=200)
    # uid = profile_data['id']
    # profile_picture = json.loads('http://graph.facebook.com/'+uid+'/picture?type=large')


    return render(request, 'profile.html', {'profile_data':profile_data,'profile_picture': profile_picture['url']})

@login_required
def map(request):
    user_social_auth = request.user.social_auth.filter(provider='facebook').first()
    graph = facebook.GraphAPI(user_social_auth.extra_data['access_token'])
    photos = graph.get_object("me/photos", limit=50)
    return render(request, 'map.html', {'photo_json': json.dumps(photos['data'])})