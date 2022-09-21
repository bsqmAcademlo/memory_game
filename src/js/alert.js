async function showModal(title, loserTime) {
    try {
        const res = await Swal.fire({
            title: title,
            showDenyButton: true,
            confirmButtonText: "Claro",
            denyButtonText: loserTime ? "toca" : `No`,
        });

        if (loserTime) {
            window.location.reload();
            return;
        }

        if (res.isConfirmed) {
            window.location.reload();
        }

        if (res.isDenied) {
            Swal.fire("Deberas recargar la pagina", "", "question");
        }
    } catch (error) {
        console.log(error);
    }
}

export { showModal };
