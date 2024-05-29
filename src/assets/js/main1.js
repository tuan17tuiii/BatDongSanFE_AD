$(function () {
    $(document).ready(function () {
        var toolbarOptions = [
            ['bold', 'italic', 'underline', 'strike'],        // các nút kiểu chữ
            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }],               // giá trị nút tùy chỉnh
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],      // chữ nhỏ trên hoặc dưới
            [{ 'indent': '-1' }, { 'indent': '+1' }],          // thụt lề
            [{ 'direction': 'rtl' }],                         // hướng văn bản

            [{ 'size': ['small', false, 'large', 'huge'] }],  // dropdown cỡ chữ
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],          // dropdown màu sắc
            [{ 'font': ['Arial', 'Helvetica', 'Times New Roman', 'Courier New'] }], // dropdown phông chữ
            [{ 'align': [] }],

            [{ 'image': '' }],                                // nút chèn hình ảnh
            ['clean']                                         // nút xóa định dạng
        ];

        var quill = new Quill('#editorr', {
            modules: {
                toolbar: toolbarOptions,
                imageResize: {
                    displaySize: true
                },
                imageToolbar: true
            },
            theme: 'snow'
        });
    });
})(jQuery);
