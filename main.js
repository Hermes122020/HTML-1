var AlumnosBD = openDatabase('dbAlumnos','1.0','Registro de Alumnos',5*1024*1024);
window.id = 0;
if(!AlumnosBD){
    alert("Su Navegador no soporta SQLWeb");
}

/*const indexDb = indexedDB.open('db_alumnos',1);*/

var generarIdUnicoDesdeFecha=()=>{
    let fecha = new Date();//03/02/2021
    return Math.floor(fecha.getTime()/1000).toString(16);
};
var appVue = new Vue({
    el:'#appAlumnos',
    data:{
        accion : 'nuevo',
        msg    : '',
        status : false,
        error  : false,
        buscar : "",
        alumno:{
            idAlumno  : 0,
            codigo      : '',
            nombre : '',
            dirección      : '',
            municipio      : '',
            departamento         : '',
            telefono      : '',
            fechaNacimiento      : '',
            sexo        : ''
        },
        alumn:[]
    },
    methods:{
        buscandoAlumnos(){
            this.alumnos = this.alumnos.filter((element,index,alumnos) => element.descripcion.toUpperCase().indexOf(this.buscar.toUpperCase())>=0 || element.codigo.toUpperCase().indexOf(this.buscar.toUpperCase())>=0 );
            if( this.buscar.length<=0){
                this.obtenerAlumnos();
            }
        },
        guardarAlumno(){
          AlumnosBD.transaction(tran=>{
              tran.executeSql('INSERT into alum alumnos(idAlumno,codigo,nombre,direccion,municipio,departamento,telefono,fechaNacimiento,sexo) VALUES(?,?,?,?,?,?,?,?,?)', 
              [++id,this.alumno.codigo,this.alumno.nombre,this.alumno.direccion,this.alumno.municipio,this.alumno.departamento,this.alumno.telefono,this.alumno.fechaNacimiento,this.alumno.sexo]);
              this.obtenerAlumnos();
              this.limpiar();

              this.msg = 'Alumno Guardado con exito.';
              this.error = false;

          }, ex=>{
              console.log(ex);
            });
        },
           modificarAlumno:function(alumno){
            App.alumno = alumno;
            appAlumnos.alumno.accion = 'modificar';
            console.log("dato",alumno);
            
           },

        eliminarAlumno:function(idAlumno){
            if(confirm("Estas seguro de eliminar este registro?")){
                fetch(`private/Mod/alumnos/procesos.php?proceso=eliminarAlumno&alumno=${idAlumno}`).then(resp=>resp.json()).then(resp=>{
                    this.buscarAlumno();
                });
                
            //NOTA: Este error está acá ya que si se quita y se pone  un "}" más antes del }, la pagina queda en blanco 
        }, 
    
            if( this.accion=='nuevo' ){
                this.alumno.idAlumno = generarIdUnicoDesdeFecha();   
            }
            let db = AlumnosBD.result,
                transaccion = db.transaction("alumnos","readwrite"),
                alumnos = transaccion.objectStore("alumnos"),
                query = alumnos.put(JSON.stringify(this.alumnos));

            query.onsuccess=event=>{
                this.obtenerAlumnos();
                this.limpiar();
                this.status = true;
                this.msg = 'Alumno Guardado con exito.';
                this.error = false;

                setTimeout(()=>{
                    this.status=false;
                    this.msg = '';
                }, 3000);
            };
            query.onerror=event=>{
                this.status = true;
                this.msg = 'Error al ingresar datos';
                this.error = true;
                console.log( event );
            };
    },
        
        obtenerAlumnos(){
        AlumnosBD.transaction(tran=>{
                tran.executeSql('SELECT * FROM alumnos',[],(index,data)=>{
                    this.alumnos = data.rows;
                    id=data.rows.length;
                });
            }, err=>{
                console.log( err );
            });
        },

        mostrarAlumno(alum){
            this.accion='mostrar';
            this.alumnos=alum;
        },

       
        limpiar(){
            this.accion='nuevo';
            this.alumnos.idAlumno='';
            this.alumnos.codigo='';
            this.alumnos.nombre='';
            this.alumnos.dirección='';
            this.alumnos.municipio='';
            this.alumnos.departamento='';
            this.alumnos.telefono='';
            this.alumnos.fechaNacimiento='';
            this.alumnos.sexo='';
        },
        eliminarAlumno(alum){
           AlumnosBD.transaction(tran=>{
                tran.executeSql('DELETE FROM alumnos WHERE idAlumno=0');
                  
                
            }, err=>{
                console.log( err );
            });
    
            if( confirm(`¿Esta seguro que desea eliminar el Alumno? :  ${alum.nombre}`) ){
                localStorage.removeItem(alum.idAlumno)
                this.obtenerAlumnos();
            }
        },
    created(){
        AlumnosBD.transaction(tran=>{
            tran.executeSql('CREATE TABLE IF NOT EXISTS alumnos(idAlumno int PRIMARY KEY NOT NULL, codigo varchar(5), nombre varchar(65),direccion varchar(65), municipio varchar(15),departamento varchar(15),telefono varchar(9),fechanacimiento varchar(15),sexo varchar(10))');
        }, err=>{
            console.log( err );
        });
        this.obtenerAlumnos();
    }
}

    });