    const [date, setDate] = useState(
        filters.date ? filters.date : new Date().toISOString().split("T")[0]
    );
    const handleDateChange = (e) => {
        const newDate = e.target.value;
        setDate(newDate);
        router.get(
            "/admin/reservations",
            { date: newDate },
            { preserveState: true }
        );
    };
