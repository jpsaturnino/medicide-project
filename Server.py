import cherrypy
import cherrypy_cors
import os
from Model.Medicine import Medicine
from Persist.MedicineDB import MedicineDB

@cherrypy.expose
class Medicines(object):
  @cherrypy.tools.accept(media = 'text/plain')
  @cherrypy.tools.json_out()
  def GET(self, id = None):
    medicineDB = MedicineDB()
    if id:
      medicine = medicineDB.seek(id)
      if medicine:
        return medicine.toJson()
    else:
      medicines = medicineDB.seek()
      medicineList = []
      for medicine in medicines:
        medicineList.append(medicine.toJson())
      return medicineList
 
  @cherrypy.tools.accept(media = 'application/json')
  @cherrypy.tools.json_in()
  @cherrypy.tools.json_out()
  def POST(self):
    data = cherrypy.request.json
    medicine = Medicine(data['id'],
                        data['description'],
                        data['generic'],
                        data['manufacturer'],
                        data['sac'],
                        data['indicated'])
    medicineDB = MedicineDB()
    medicineDB.insert(medicine)
    return medicine.id

  @cherrypy.tools.accept(media = 'application/json')
  @cherrypy.tools.json_in()
  @cherrypy.tools.json_out()  
  def PUT(self):
    data = cherrypy.request.json
    medicine = Medicine(data['id'],
                data['description'],
                data['generic'],
                data['manufacturer'],
                data['sac'],
                data['indicated'])
    medicineDB = MedicineDB()
    medicineDB.change(medicine)

  @cherrypy.tools.accept(media = 'text/plain')
  @cherrypy.tools.json_out()
  def DELETE(self, id = None):
    if id:
      medicineDB = MedicineDB()
      medicineDB.remove(id)

  def OPTIONS(self):
    cherrypy_cors.preflight(allowed_methods=['GET','POST','DELETE'])

if __name__ == "__main__":
  conf = {
    '/':{
      'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
      'tools.sessions.on': True,
      'tools.response_headers.on': True,
      'tools.staticdir.root': os.path.abspath(r'C:/Users/jp_sa/Documents/AvaliacaoJosePaulo'),
      'tools.response_headers.headers':  [('Content-Type','text/plain'),('Access-Control-Allow-Origin','*')]
    },
    '/public':{
      'tools.staticdir.on': True,
      'tools.staticdir.dir': './public'
    }
  }
  cherrypy.quickstart(Medicines(), '/', conf) #localhost:8080/public/index.html