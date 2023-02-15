from flask import Blueprint

#create main api blueprint
api = Blueprint(
	"api",
	__name__,
	url_prefix="/api"
)

@api.route("/hello-world", methods=["GET",])
def apihello():
	#renders the api response 

	return {"hello-world" : "from the api"}
