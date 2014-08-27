import sys
import riak

client = riak.RiakClient(host='127.0.0.1', pb_port=8087, protocol='pbc')

# Creating Buckets
post_bucket = client.bucket('Posts')
user_post_bucket = client.bucket('Users')

# Function
def get_post(id):
    return post_bucket.get(id)

def leer_post(id):
    post = get_post(id).data
    print 'Id: ' + id
    print 'Titulo: ' + post['title']
    print 'Cuerpo: ' + post['body']
    print 'Comentarios (' + str(len(post['comments'])) + ')'
    print '------------------------------'
    
def crear_post(post_id, user_id, title, body):
    user = user_post_bucket.get(user_id)
    if user.data is None:
        user.data = {
                'user_id': user_id,
                'posts': []
            }
    
    user.data['posts'] = filter(lambda post: str(post['post_id']) != str(post_id), user.data['posts'])

    post = post_bucket.new(post_id, data = {
            'post_id': post_id, 
            'user_id': user_id, 
            'title': title, 
            'body': body,
            'comments': []
        })
    
    user.store()    
    post.store()

    print 'Se creo el post ' + post_id

def borrar_post(id):
    post_bucket.delete(id)
    print 'Se borro el post exitosamente'

def listar_posts(id):
    print 'Los post del usuario #' + id + ' son:'
    post_ids = user_post_bucket.get(id).data['posts']
    for post_id in post_ids:
        leer_post(post_id)

def agregar_comentario(id, comentario):
    post = get_post(id)
    post.data['comments'].append(comentario)
    post.store()
    'Se agrego el comentario al post ' + id

def listar_comentarios(id):
    print 'Los comentarios del post #' + id + ' son: '
    comments = get_post(id).data['comments']
    for comment in comments:
        print str(comment)

def mostrar_ayuda():
    print "Comandos:"
    print "> crear_post <post_id> <user_id> <titulo> <cuerpo>"
    print "> leer_post <post_id>"
    print "> listar_posts <user_id>"
    print "> agregar_comentario <post_id> <comentario>"
    print "> listar_comentarios <post_id>"

#Ejecucion de acciones
if len(sys.argv) == 1:
    mostrar_ayuda()

elif sys.argv[1] == "crear_post":
	crear_post(sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5])

#Leer un post(post_id)	
elif sys.argv[1] == "leer_post":
    leer_post(sys.argv[2])

#Borrar un post(post_id)
elif sys.argv[1] == "borrar_post":
    borrar_post(sys.argv[2])
    
elif sys.argv[1] == "listar_posts":
    listar_posts(sys.argv[2])

elif sys.argv[1] == "agregar_comentario":
    agregar_comentario(sys.argv[2], sys.argv[3])

elif sys.argv[1] == "listar_comentarios":
    listar_comentarios(sys.argv[2])

else:
    print "operacion invalida"