from Model.Medicine import Medicine
import sqlite3

dataBase = 'medicine.db'

class MedicineDB():

  def __init__(self):
    with sqlite3.connect(dataBase) as db:
      db.execute('''create table if not exists medicine(
                    id integer not null primary key autoincrement,
                    description text not null,
                    generic text not null,
                    manufacturer text not null,
                    sac text not null,
                    indicated text not null)''')

  def insert(self,medicine):
    with sqlite3.connect(dataBase) as db:
      cursor = db.cursor()
      cursor.execute('''insert into medicine(description, generic, manufacturer, sac, indicated)
                        values(?,?,?,?,?)''',[medicine.description,
                                              medicine.generic,
                                              medicine.manufacturer,
                                              medicine.sac,
                                              medicine.indicated])
      medicine.id = cursor.lastrowid
  
  def change(self,medicine):
    with sqlite3.connect(dataBase) as db:
      db.execute('''update medicine set description = ?, generic = ?, manufacturer = ?, 
                    sac = ?, indicated = ? where id = ?''', [medicine.description,
                                                              medicine.generic,
                                                              medicine.manufacturer,
                                                              medicine.sac,
                                                              medicine.indicated,
                                                              medicine.id]) 
  def remove(self,id):
    with sqlite3.connect(dataBase) as db:
      db.execute('''delete from medicine where id = ?''',[id])

  def seek(self,id = None):
    with sqlite3.connect(dataBase) as db:
      if id:
        data = db.execute('''select id, description, generic, manufacturer, sac, indicated 
                             from medicine where id = ?''',[id])
        data = data.fetchone()
        if data:
          result = Medicine(data[0], data[1], data[2], data[3], data[4], data[5])
          return result
      else:
        medicineList = []
        data = db.execute('''select id, description, generic, manufacturer, sac, indicated from medicine''')
        data = data.fetchall()
        for row in data:
          m = Medicine(row[0], row[1], row[2], row[3], row[4], row[5])
          medicineList.append(m)
        return medicineList