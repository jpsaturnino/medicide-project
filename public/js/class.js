class Medicine{
  constructor(id, description, generic, manufacturer, sac, indicated) {
    this.id = id;
    this.description = description;
    this.generic = generic;
    this.manufacturer = manufacturer;
    this.sac = sac;
    this.indicated = indicated;
  }
}

class medicineManager {
  constructor() {
  }

  add(medicine, containerElement) {
    fetch('http://localhost:8080', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(medicine)
    }).then((resp) => {
      if (resp.ok) { 
          var reader = resp.body.getReader();
          reader.read().then((data) => {
            medicine.id = parseInt(String.fromCharCode.apply(null, data));
            var dataRow = document.createElement("tr");
            dataRow.innerHTML = "<td>" + medicine.id + "</td>" + "<td>" + medicine.description + "</td>" +
        				          	    "<td>" + medicine.generic + "</td>" +
        				          	    "<td>" + medicine.manufacturer + "</td>" +
        				          	    "<td>" + medicine.sac + "</td>" +
        				        	      "<td>" + medicine.indicated + "&nbsp;&nbsp;" +
        				        	      "<button type='button' class='close' aria-label='Close' onclick='removeInPosition(" + medicine.id + ")'>" +
        				        	      "<span aria-hidden='true'>&times;</span>" +
        				        	      "</button>" +
        				        	      "</td>";
            if (!containerElement.children[0] == undefined) {
              containerElement.children[0].tBodies[0].appendChild(row);
            } else {
              window.location.reload();
          }
        });
      }
    });
  }

  remove(medicine, containerElement) {
  	fetch('http://localhost:8080/' + medicine, {
        method: 'DELETE'
      }).then((resp) => {
  		this.showMedicinesAsTable(containerElement); 
  	});
  }

  showMedicinesAsTable(containerElement) {
    containerElement.innerHTML = "";
    fetch('http://localhost:8080', {
        method: 'GET'
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        containerElement.innerHTML = "<p>Não foi possível obter os dados do servidor</p>";
      }
    }).then((json) => {
      if (json.length == 0) {
        containerElement.innerHTML = "<p>Não há medicamentos cadastrados</p>";
      } else {
        var table = document.createElement("table");
        table.className = "table table-hover";

        var tableHeader = document.createElement("thead");
        tableHeader.className = "thead-dark";

        var tableRow = document.createElement("tr");
        tableRow.innerHTML = "<th>id</th>" + "<th>Remédio</th>" +
            				         "<th>Genérico</th>" +
            				         "<th>Fabricante</th>" +
            				         "<th>SAC</th>" +
            				         "<th>Indicação</th>" +
            				         "<th>Ação</th>";
        tableHeader.appendChild(tableRow);
        table.appendChild(tableHeader);

        var tableBody = document.createElement("tbody");
        for (let i = 0; i < json.length; i++) {
          var dataRow = document.createElement("tr");
          dataRow.innerHTML = "<td>" + json[i].id + "</td>" + "<td>" + json[i].description + "</td>" +
                              "<td>" + json[i].generic + "</td>" +
                              "<td>" + json[i].manufacturer + "</td>" +
        				              "<td>" + json[i].sac + "</td>" +
        				              "<td>" + json[i].indicated +
				                      "<td>" + "<button type='button' class='btn btn-danger' onclick='removeInPosition(" + json[i].id + ")'> Excluir </button>" + "</td>";
          tableBody.appendChild(dataRow);
        }
        table.appendChild(tableBody);
        containerElement.appendChild(table);
      }
    });
  }

}
