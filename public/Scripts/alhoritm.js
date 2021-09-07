/*const { get } = require("jquery");
*/
$(function(){
    $('#recipeChoice').on('change', function(){
        //console.log($(this).val())
        document.location.href='/process/'+$(this).val();
    });
    $('.unhiddenTr').on('click',function(){
        $('.unhiddenTr').css('display','none')
        $('.hiddenTr').css('display','inline')
    })
    $('#tableChoice').on('change', function(){
        $.ajax({
            type:'get',
            url: '/ajax/table',
            data: 'name='+$(this).val(),
            success: function(data){
                $('#col_source').html(data);
                $('#col_sort').html(data);
                console.log(data);
            },
            error: function(error){
                console.log("Error: ", error);
            }
        })
        //console.log($(this).val())
       // document.location.href='/process/'+$(this).val();
    });
    $('#filter_ok').on('click',function(){
        let filterSource, sourseColumn, filterIncDec, filterTable, filterColumnSort;
        filterSource = $('#filter_abc').val();
        sourseColumn = $('#col_source').val();
        filterIncDec = $("input[type='radio'][name='sort']:checked").val();
        filterTable = $('#tableChoice').val();
        filterColumnSort = $('#col_sort').val();
        $.ajax({
            type: 'get',
            url: '/equipment/filter',
            data: 'filter_abc='+filterSource+'&table_choice='+filterTable+'&source_col='+sourseColumn+'&sort='+filterIncDec+'&col_sort='+filterColumnSort,
            success:function(data){
                console.log('data: ', typeof(data), data)
                var table = $('#tableChoice').val();
                tbody = $('#'+table).html("");
              //  dataJSON = JSON.stringify(data);
                Object.keys(data).forEach(key=>{
                    row = data[key];
                    tbody.append('<tr>');
                    Object.keys(row).forEach(key2=>{
                        column = row[key2];
                        tbody.append('<td>'+column+'</td>');
                    })
                    tbody.append('</tr>');
                })
               // 
                //$('.'+table).html(data);
            },
            error: function(err){
                console.log("Error", err)
            }
        })
    })
    $('#gasChoice').on('change', function(){
        let id = $(this).val();
        document.location.href='/gas/'+id;
    })
    
})