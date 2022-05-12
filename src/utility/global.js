
export const fetchPalletsColor = (type) => {
    switch (parseInt(type)) {
        case 1:
            return '#366EEF';

        case 2:
            return '#00ACAC';

        case 3:
            return '#8558ED';

        case 4:
            return '#EF8C29';

        case 5:
            return '#C35047';

        case 6:
            return '#50A9D8';

        default:
            return '#366EEF';

    }
}