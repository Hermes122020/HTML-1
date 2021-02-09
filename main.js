const indexDb = indexedDB.open('db_alumnos',1);

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
            /**
             * webSQL -> DB Relacional en el navegador
             * localStorage -> BD NOSQL clave/valor
             * indexDB -> BD NOSQL clave/valor
             */
            if( this.accion=='nuevo' ){
                this.alumno.idAlumno = generarIdUnicoDesdeFecha();   
            }
            let db = indexDb.result,
                transaccion = db.transaction("tblalumnos","readwrite"),
                alumnos = transaccion.objectStore("tblalumnos"),
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
            /*this.alumnos = [];
            for (let index = 0; index < localStorage.length; index++) {
                let key = localStorage.key(index);
                this.alumnos.push( JSON.parse(localStorage.getItem(key)) );
            }*/
        },
        mostrarAlumno(alum){
            this.alumno= alum;
            this.accion='modificar';
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
            if( confirm(`¿Esta seguro que desea eliminar el Alumno? :  ${alum.nombre}`) ){
                localStorage.removeItem(alum.idAlumno)
                this.obtenerAlumnos();
            }
        }
    },
    created(){
        indexDb.onupgradeneeded=event=>{
            let db=event.target.result,
                tblalumnos = db.createObjectStore('tblalumnos',{autoIncrement:true});
            tblalumnos.createIndex('idAlumno','idAlumno',{unique:true});
        };
        this.obtenerAlumnos();
    }
});