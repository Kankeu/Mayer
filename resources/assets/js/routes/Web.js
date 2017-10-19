import route from './Route'
const routes = [
    ...new route().resource("/articles","ArticlesController").all(),
    ...new route().resource("/user","UserArticlesController").all(),
    ...new route().resource("/commandes","CommandesController").all(),
    new route().post("/dimension/([0-9]+)","DimensionsController@store"),
    new route().put("/dimension/([0-9]+)","DimensionsController@store"),
    new route().get("/like/article/([0-9]+)","LikesController@article"),
    new route().get("/like/commentaire/([0-9]+)","LikesController@commentaire"),
    ...new route().resource("/comments/([0-9]+)","CommentsController").all(),
    ...new route().resource("/commandes","CommandesController").all(),
    new route().get("/comments/([0-9]+)\\?page=([0-9]+)","CommentsController@loadMore"),
    ...new route().resource("/panier","PanierController").all(),
]
export default routes
