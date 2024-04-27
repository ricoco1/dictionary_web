let word = "{{ word }}";
        $(document).ready(function() {

        });

        function save_word() {
            let defs = {{ definitions | tojson }};
            for (let i = 0; i < defs.length; i++) {
                let def = defs[i];
                let category = def.fl;
                let shortdef = def.shortdef[0];
                let date = def.date;

                defs[i] = {
                    category: category,
                    shortdef: shortdef,
                    date: date,
                };
            }

            let data = {
                word_give: word,
                definitions_give: defs,
            }
            $.ajax({
                type: 'POST',
                url: '/api/save_word',
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
                success: function(response) {
                    if (response.result === 'success') {
                        Swal.fire({
                            icon: 'success',
                            title: 'Sukses', 
                            text: response.msg,
                            showConfirmButton: true, 
                            confirmButtonText: 'OK', 
                        }).then(function() {
                            window.location.href = `/detail/${word}?status_give=old`;
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                            showConfirmButton: true,
                            confirmButtonText: 'OK', 
                        });
                    }
                }
            });
        }

        function delete_word() {
            Swal.fire({
                title: 'Are you sure?',
                text: 'You won\'t be able to revert this!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        type: 'POST',
                        url: '/api/delete_word',
                        data: {
                            word_give: word,
                        },
                        success: function(response) {
                            if (response.result === 'success') {
                                Swal.fire({
                                    icon: 'success',
                                    title: response.msg,
                                    showConfirmButton: false,
                                    timer: 1500
                                }).then(function() {
                                    window.location.href = `/detail/${word}?status_give=new`;
                                });
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Something went wrong!',
                                });
                            }
                        }
                    });
                }
            });
        }

