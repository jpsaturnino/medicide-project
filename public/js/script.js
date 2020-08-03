elemForm = document.querySelector("[data-Form]");
elemTable = document.querySelector("[data-Table]");

window.onload=init;

function init() {
  
  manager = new medicineManager();
  manager.showMedicinesAsTable(elemTable);
}

elemForm.oninput = () => {
	validSubmit()
}

elemForm.onsubmit = () => {
	if(validSubmit()){
		var description = document.querySelector("[data-Description]").value;
		var generic = document.querySelector("input[name='inputIndicated']:checked").value
		var manufacturer = document.querySelector("[data-Manufacturer]").value
		var sac = document.querySelector("[data-SAC]").value
		var indicated = document.querySelector("[data-Indicated]").value
		var medicine = new Medicine(0,description,generic,manufacturer,sac,indicated);
		manager.add(medicine);
		return true;			
	}
	return false;
}

function hasMinLength(name,minLength){
	if(name.length < minLength){
		return false;
	}
	else{
		return true;
	}
}

function removeInPosition(position) {
  manager.remove(position, elemTable);
}

function validSubmit(){
	var elemDescription = document.querySelector("[data-Description]")
	var elemGeneric = document.querySelector("input[name='inputIndicated']:checked")
	var elemManufacturer = document.querySelector("[data-Manufacturer]")
	var elemSAC = document.querySelector("[data-SAC]")
	var elemInd = document.querySelector("[data-Indicated]")
	elemMessage1 = document.querySelector("[data-WarningDesc]")
	elemMessage2 = document.querySelector("[data-WarningManu]")
	elemMessage3 = document.querySelector("[data-WarningSac]")
	elemMessage4 = document.querySelector("[data-WarningInd]")
	elemMessage5 = document.querySelector("[data-WarningGen]")
 
	if(!hasMinLength(elemDescription.value,2)){
		elemMessage1.className="text-danger";
		elemMessage1.innerHTML="<small><strong>Atenção! </strong>Nome não pode testar vazio e deve ter mais de 2 caracteres</small>";
		return false;	
	} else {
		elemMessage1.className="";
		elemMessage1.innerHTML="";
	}

	if(elemGeneric == null){
		elemMessage5.className="text-danger";
		elemMessage5.innerHTML="<small><strong>Atenção! </strong>Este campo deve ser selecionado</small>";
		return false;	
	} else {
		elemMessage5.className="";
		elemMessage5.innerHTML="";
	}

	if (!hasMinLength(elemManufacturer.value,2)) {
		elemMessage2.className="text-danger";
		elemMessage2.innerHTML="<small><strong>Atenção! </strong>Fabricante não pode testar vazio e deve ter mais de 2 caracteres</small>";
		return false;       
    } else {
		elemMessage2.className="";
		elemMessage2.innerHTML="";
	}

	if (!hasMinLength(elemSAC.value,2)) {
		elemMessage3.className="text-danger";
		elemMessage3.innerHTML="<small><strong>Atenção! </strong>SAC não pode testar vazio e deve ter mais de 2 caracteres</small>";
		return false;       
    } else {
		elemMessage3.className="";
		elemMessage3.innerHTML="";
	}

    if(elemInd == "Selecionar..."){
		elemMessage4.className="text-danger";
		elemMessage4.innerHTML="<small><strong>Atenção! </strong>Esta opção deve estar selecionada</small>";
		return false; 
    } else {
		elemMessage4.className="";
		elemMessage4.innerHTML="";
	}

    return true;
}

function removeI(indice){
	if(indice >=0 && indice < manager.medicineList.length)	{
		manager.medicineList.splice(indice,1);
		manager.showTable(elemTable);
		manager.save();
	}
}