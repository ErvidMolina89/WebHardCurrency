<?php
class Pago {   
        // Properties   
        private $id;   
        private $nombre;       
        // Methods   
        function __construct($id, $nombre){
            $this->id = $id;
            $this->nombre = $nombre;  
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
    }
?>