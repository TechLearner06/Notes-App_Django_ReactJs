from  my_notes.models import Note
from my_notes.serializers import NoteSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.db.models import Q

# Create your views here.


@api_view(['GET'])
def search_notes(request):
    query = request.query_params.get("search","")  ## Get the 'search' query parameter

    if query:
         # Filter notes by matching query in title, body, or category
        notes= Note.objects.filter(
            Q(title__icontains=query) | 
            Q(description__contains = query) |          
            Q(category__contains = query)
        )

    else:
        notes = Note.objects.all()  # If no query, return all notes

    #The filtered notes queryset is serialized using the NoteSerializer and returned as a JSON response.
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)

@api_view(['GET','POST'])
def notes(request):
    if request.method == "GET":
        notes =Note.objects.all()
        serializer = NoteSerializer(notes,many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = NoteSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET','PUT','DELETE'])
def note_detail(request,slug):
    try:
        note=Note.objects.get(slug=slug)
    except Note.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    

    if request.method == 'GET':
        serializer=NoteSerializer(note)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = NoteSerializer(note,data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)  # No need for serializer here

    

