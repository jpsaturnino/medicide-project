class Medicine():
  def __init__(self,id=None, description='vazio', generic='vazio', manufacturer='vazio', sac='vazio', indicated="vazio"):
    self.__id = id
    self.__description = description
    self.__generic = generic 
    self.__manufacturer = manufacturer
    self.__sac = sac
    self.__indicated = indicated

  @property
  def id(self):
    return self.__id
  @id.setter
  def id(self,value):
    self.__id = value

  @property
  def description(self):
    return self.__description
  @description.setter
  def description(self,value):
    self.__description = value

  @property
  def generic(self):
    return self.__generic
  @generic.setter
  def generic(self,value):
    self.__generic = value

  @property
  def manufacturer(self):
    return self.__manufacturer
  @manufacturer.setter
  def manufacturer(self,value):
    self.__manufacturer = value

  @property
  def sac(self):
    return self.__sac
  @sac.setter
  def sac(self,value):
    self.__sac = value

  @property
  def indicated(self):
    return self.__indicated
  @indicated.setter
  def indicated(self,value):
    self.__indicated = value

  def toJson(self):
    pDict = {}
    pDict['id'] = self.id
    pDict['description'] = self.description
    pDict['generic'] = self.generic
    pDict['manufacturer'] = self.manufacturer
    pDict['sac'] = self.sac
    pDict['indicated'] = self.indicated
    return pDict