<?php
class Producto {   
        // Properties   
        private $id;   
        private $nombre;    
        private $costoUnitario;    
        // Methods   
        function __construct($id, $nombre, $costo){
            $this->id = $id;
            $this->nombre = $nombre;  
            $this->costoUnitario = $costo;
        }
        function set_id($id) {     
            $this->id = $id;   
        }   
        function get_id() {     
            return $this->id;   
        }   
        function set_nombre($nombre) {     
            $this->nombre = $nombre;   
        }   
        function get_nombre() {     
            return $this->nombre;   
        }   
        function set_costo($costo) {     
            $this->costoUnitario = $costo;   
        }   
        function get_costo() {     
            return $this->costoUnitario;   
        } 
    }
?>