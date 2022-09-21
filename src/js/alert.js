async function showModal() {
    try {
        const res = await Swal.fire({
            title: "Super, ganaste, Quieres comenzar de nuevo?",
            showDenyButton: true,
            confirmButtonText: "Claro",
            denyButtonText: `No`,
        });

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
