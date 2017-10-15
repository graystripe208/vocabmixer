(function ($) {
    var ingredients = [];

    $(document).ready(function () {
        $("#ingredientsForm").on("submit", function (e) {
            var word = $('#word').val();
            var desc = $('#definition').val();

            // Make sure the form isn't submitted
            e.preventDefault();

            // Clear the boxes
            $(this).find("input[type=text]").val("");

            // Make sure there is something to add
            if(!word || !desc) return;

            // Create a new row
            var row = '<tr><td><div class="draggable" draggable="true"><span class="icon style2 fa-arrows-v"></span>';
            row += word;
            row += '</div></td><td>';
            row += desc;
            row += '</td></tr>';
            $('#themix tbody').append(row);

            ingredients.push({
                desc: desc,
                status: null,
                word: word
            });
        });
    });
})(window.jQuery);