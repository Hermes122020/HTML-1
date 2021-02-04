$(document).ready(function(){
    $('#btnSave').hide();
     $('#txtnombre').focus();   
   var fila_borrar=-1;
   var MisAlumnos = localStorage.getItem("MisAlumnos");
   MisAlumnos = JSON.parse(MisAlumnos);
   if(MisAlumnos == null){ 
       MisAlumnos = [];
   }else{
       MostrarAlumnos();
   }
   $('#btnAdd').click(function(){
           AddStudents();
   });
   
       $(document).on('click','#btnBorrar',function(){                         
                       fila_borrar = parseInt($(this).attr("alt")); 
                       MisAlumnos.splice(fila_borrar, 1); 
                       localStorage.setItem("MisAlumnos", JSON.stringify(MisAlumnos));
                       alert("Registro de Alumno Eliminado");                                  
                       MostrarAlumnos();               
       });
      
       $(document).on('click','#btnEditar',function(){ 
                   $('#btnAdd').hide();
                   fila_borrar=parseInt($(this).attr('alt'));
                   var estudiante = JSON.parse(MisAlumnos[fila_borrar]); 
                   $("#txtcod").val(estudiante.codigo);
                   $("#txtnombre").val(estudiante.nombre);
                   $("#txtdireccion").val(studiante.direccion);
                   $("#txtmuni").val(estudiante.municipio);
                   $("#txtdepa").val(estudiante.departamento);
                   $("#txttel").val(estudiante.telefono);
                   $("#txtnac").val(estudiante.fechnacimiento);
                   $("#txtsex").val(estudiante.sexo);
                    $('#btnSave').show();                                               
           
       });
       $('#btnSave').click(function(){
           $('#btnAdd').show();
                           MisAlumnos [fila_borrar]= JSON.stringify({ 
                           codigo : $("#txtcod").val(),
                           nombre : $("#txtnombre").val(),
                           direccion : $("#txtdireccion").val(),
                           municipio : $("#txtmuni").val(),
                           departamento : $("#txtdepa").val(),
                           telefono : $("#txttel").val(),
                           fechnacimiento : $("#txtnac").val(),
                           sexo : $("#txtsex").val(),
                       });
                       localStorage.setItem("MisAlumnos", JSON.stringify(MisAlumnos));
                       alert("Registro de Alumno Actualizado");
                        $('#btnSave').hide(); 
                        $('input').val(''); 
                           $('#txtnombre').focus();                        
                       MostrarAlumnos();
       });





function AddStudents(){
if ($.trim($('#txtcod').val())==''){            
               alert('Ingresa el codigo');
               $('#txtcod').focus();
               return false;
   }

   if ($.trim($('#txtnombre').val())==''){         
       alert('Ingresa el nombre');
       $('#txtnombre').focus();
       return false;
   }

   if ($.trim($('#txtdireccion').val())==''){          
   alert('Ingresa la direccion');
   $('#txtdireccion').focus();
   return false;
   }

   if ($.trim($('#txtmuni').val())==''){           
   alert('Ingresa el municipio');
   $('#txtmuni').focus();
   return false;
   }

   if ($.trim($('#txtdepa').val())==''){           
   alert('Ingresa el departamento');
   $('#txtedad').focus();
   return false;
   }

   if ($.trim($('#txttel').val())==''){            
   alert('Ingresa el teléfono');
   $('#txttel').focus();
   return false;
   }

   if ($.trim($('#txtnac').val())==''){            
   alert('Ingresa la fecha de nacimiento');
   $('#txtnac').focus();
   return false;
   }

   if ($.trim($('#txtsex').val())==''){            
   alert('Ingresa el sexo');
   $('#txtsex').focus();
   return false;
   }
   
var students = JSON.stringify({       
   codigo : $("#txtcod").val(),
   nombre : $("#txtnombre").val(),
   direccion : $("#txtdireccion").val(),
   municipio : $("#txtmuni").val(),
   departamento : $("#txtdepa").val(),
   telefono : $("#txttel").val(),
   fechnacimiento : $("#txtnac").val(),
   sexo : $("#txtsex").val(),
});

MisAlumnos.push(students);
localStorage.setItem("MisAlumnos", JSON.stringify(MisAlumnos));
alert("Alumno Registrado con Exito");
$('input').val('');
$('#txtnombre').focus();
MostrarAlumnos();
}

function MostrarAlumnos()   {
$('#tblStudents tr:not(:first)').remove();
       for(var i in MisAlumnos)
       {
           var con = JSON.parse(MisAlumnos[i]);
       $('#tblStudents tr:last').after('<tr><td>'+con.codigo+'</td><td>'+con.nombre+'</td><td>'+con.direccion+'</td><td>'+con.municipio+'</td><td>'+con.departamento+'</td><td>'+con.telefono+'</td><td>'+con.fechnacimiento+'</td><td>'+con.sexo+'</td><td>'+'<button id="btnBorrar" alt="'+i+'" class="btn btn-danger btn-sm">Borrar</button>   <button id="btnEditar" alt="'+ i +'" class="btn btn-info btn-sm">Seleccionar</button>'+'</td></tr>');
       }
}

});