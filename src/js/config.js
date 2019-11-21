// zoom thumbs
import foto_01 from '../images/foto-01.jpg';
import foto_02 from '../images/foto-02.jpg';
import foto_03 from '../images/foto-03.jpg';

$(document).ready(function(){
    $('body').on('click','.standard', function(){ 
       // imagens vidas do banco serão passadas como parametro 
        var standard = $(this).attr('v-standard');
        var src = document.getElementById("imageStandard");
        var zm85 = document.getElementById("zm85");
        if (standard == "v1") {
            src.src = foto_01;
            zm85.src=foto_01;
        }else if (standard == "v2") {
            src.src = foto_02;
            zm85.src = foto_02;
        }else if(standard == "v3"){
            src.src = foto_03;
            zm85.src = foto_03;
        }        
    });
});

// wish list

$(document).ready(function(){
    var x = 0;
    var html_heart = "";
    $('body').on('click','.WishList', function(){ 
        if (x % 2 == 0) {
            $(".clear").remove();  
            html_heart = '<i class="fas fa-heart clear" style="color: red;"></i><span style="font-size: 14px; margin-left: 8px;" class="clear">Adicionado à lista</span>';
        }if (x % 2 == 1) {
            $(".clear").remove();  
            html_heart = '<i class="far fa-heart clear"></i><span style="font-size: 14px; margin-left: 8px;" class="clear">Lista de Desejos</span>';
        }
        $(this).append(html_heart);
        x++;
    });
});

// ação para calcular frete
$(document).ready(function(){
    $('body').on('click','.action', function(){ 
        confirm("Trigger para calcular acionado");
    });
});



