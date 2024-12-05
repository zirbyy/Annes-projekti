if (!localStorage.getItem('loggedIn')) {
    window.location.href = 'intralogin.html';
}

// Mapping of locations to their respective start and end dates
const locationDates = {
    "Italian Gardajärvi": { start: "", end: "" },
    "Norjan Lofootit": { start: "", end: "" },
    "Islanti Blueberry Hills Villa": { start: "", end: "" }, 
    "Slovenia Hotel San Martin": { start: "", end: "" },
    "Tanska Hotel Scandic": { start: "", end: "" }
};

function toggleTripForm(reset = true) {
    const tripForm = document.getElementById('tripForm');
    const modalOverlay = document.getElementById('modalOverlay');
    tripForm.classList.toggle('show');
    modalOverlay.classList.toggle('show');
    
    if (tripForm.classList.contains('show') && reset) {
        document.getElementById('tripIdDisplay').value = generateUniqueId();
        document.getElementById('location').value = '';
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
        const dateField = document.getElementById('date');
        const returnDateField = document.getElementById('returnDate');
        dateField.value = '';
        returnDateField.value = '';
        dateField.min = new Date().toISOString().split('T')[0];
        returnDateField.min = new Date().toISOString().split('T')[0];
        document.getElementById('imagePreview').style.display = 'none';
        document.getElementById('coordinates').value = '';
    }
}

function generateUniqueId() {
    return 'trip-' + Date.now();
}

function editTrip(tripId) {
    const tripForm = document.getElementById('tripForm');
    const modalOverlay = document.getElementById('modalOverlay');
    tripForm.classList.add('show');
    modalOverlay.classList.add('show');
    
    const tripList = document.getElementById('tripList');
    const tripItem = Array.from(tripList.children).find(item => {
        const itemData = item.dataset.tripData;
        if (itemData) {
            const data = JSON.parse(itemData);
            return data.tripId === tripId;
        }
        return false;
    });

    if (tripItem) {
        const tripData = JSON.parse(tripItem.dataset.tripData);
        document.getElementById('tripIdDisplay').value = tripData.tripId;
        document.getElementById('location').value = tripData.location;
        document.getElementById('title').value = tripData.title;
        document.getElementById('description').value = tripData.description;
        document.getElementById('date').value = tripData.date;
    }
}

function deleteTrip(tripId) {
    if (confirm('Haluatko varmasti poistaa tämän matkan?')) {
        const tripList = document.getElementById('tripList');
        const tripItem = Array.from(tripList.children).find(item => {
            const itemData = item.dataset.tripData;
            if (itemData) {
                const data = JSON.parse(itemData);
                return data.tripId === tripId;
            }
            return false;
        });
        
        if (tripItem) {
            tripList.removeChild(tripItem);
        }
    }
}

function addTrip() {
    const tripId = document.getElementById('tripIdDisplay').value;
    const location = document.getElementById('location').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;
    const returnDate = document.getElementById('returnDate').value;

    if (!location || !title || !description || !date || !returnDate) {
        alert('Täytä jokainen kohta ennen tallentamista.');
        return;
    }

    const tripData = {
        tripId,
        location,
        title,
        description,
        date,
        returnDate
    };

    const tripList = document.getElementById('tripList');
    const listItem = document.createElement('li');
    listItem.dataset.tripData = JSON.stringify(tripData);
    listItem.textContent = `${title} - ${location} - ${date} to ${returnDate}`;
    
    const editButton = document.createElement('button');
    editButton.textContent = 'Muokkaa';
    editButton.className = 'edit-button';
    editButton.onclick = () => editTrip(tripId);
    listItem.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Poista';
    deleteButton.className = 'delete-button';
    deleteButton.onclick = () => deleteTrip(tripId);
    listItem.appendChild(deleteButton);
    
    const existingItem = Array.from(tripList.children).find(item => {
        const itemData = item.dataset.tripData;
        if (itemData) {
            const data = JSON.parse(itemData);
            return data.tripId === tripId;
        }
        return false;
    });
    
    if (existingItem) {
        tripList.removeChild(existingItem);
    }
    
    tripList.appendChild(listItem);
    toggleTripForm(true);
}

const locationImages = {
    "Italian Gardajärvi": "PixabayItavalta.jpg",
    "Norjan Lofootit": "PixabayLofootit.jpg",
    "Islanti Blueberry Hills Villa": "PixabayIslanti_1.jpg",
    "Slovenia Hotel San Martin": "PixabaySlovenia.jpg",
    "Tanska Hotel Scandic": "PixabayTanska.jpg"
};

document.getElementById('location').addEventListener('change', function() {
    const location = this.value;
    const titleField = document.getElementById('title');
    const dateField = document.getElementById('date');
    const imagePreview = document.getElementById('imagePreview');
    const coordinatesField = document.getElementById('coordinates');
    const descriptionField = document.getElementById('description');
    
    if (location) {
        titleField.value = `Reissu: ${location}`;
        const imageName = locationImages[location];
        if (imageName) {
            imagePreview.src = `/assets/Matkat/MatkatKuvia/${imageName}`;
            imagePreview.style.display = 'block';
        } else {
            imagePreview.src = '#';
            imagePreview.style.display = 'none';
        }

        const coordinates = locationCoordinates[location];
        coordinatesField.value = coordinates ? coordinates : 'Koordinaatit ei saatavilla';

        const description = locationDescriptions[location];
        descriptionField.value = description ? description : 'Kuvaus ei saatavilla';
    } else {
        titleField.value = '';
        dateField.value = '';
        imagePreview.src = '#';
        imagePreview.style.display = 'none';
        coordinatesField.value = '';
        descriptionField.value = '';
    }
});
const locationCoordinates = {
    "Italian Gardajärvi": "45.62441651545789, 10.633384740456691",
    "Norjan Lofootit": "68.03697264528303, 13.662842098796732",
    "Islanti Blueberry Hills Villa": "64.11414474918355, -21.63168724562287",
    "Slovenia Hotel San Martin": "46.00624383835545, 13.556297995949581",
    "Tanska Hotel Scandic": "" 
};

const locationDescriptions = {
    "Italian Gardajärvi": "GARDA: HYVINVOINTIA GARDALLA JA VILLA ARCADIOSSA\n\nKauniille maisemille, italialaisille herkuille ja kiireettömälle tunnelmalle on helppo menettää sydämensä. Pienen hotellin ravintola on varsin arvostettu ja tasokas. Tilan omilta mailta tulevat niin kasvikset, yrtit, kananmunat kuin oliivit ja marjatkin.",
    "Norjan Lofootit": "LOFOOTIT: TAIKAMATKA TURKOOSISTA VEDESTÄ NOUSEVIEN VUORTEN HUIPULLE\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lobortis congue eros at ullamcorper. Maecenas mi ex, ultricies quis sem sed, vestibulum rutrum nisi. Vivamus pretium nulla at aliquet ornare. Sed sed lorem quis orci bibendum ultrices vitae eget sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam feugiat at lorem faucibus cursus. Proin hendrerit dignissim pretium.",
    "Islanti Blueberry Hills Villa": "ISLANTI: JÄÄTIKOT; KUUMAT LÄHTEET; LAAVAPELLOT JA VESIPUTOUKSET\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lobortis congue eros at ullamcorper. Maecenas mi ex, ultricies quis sem sed, vestibulum rutrum nisi. Vivamus pretium nulla at aliquet ornare. Sed sed lorem quis orci bibendum ultrices vitae eget sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam feugiat at lorem faucibus cursus. Proin hendrerit dignissim pretium.",
    "Slovenia Hotel San Martin": "SLOVENIA: PATIKKAA JA VIINITILOJA\n\nVuoristopolkuja, kirkkaan veden välkettä ja pehmeitä viheriöitä… Slovenia tarjoaa runsaasti vaihtoehtoja liikunnalliseen lomaan. Slovenian luontoon on hyvä tutustua vaeltamalla. Ylläpidettyjä vaellusreittejä löytyy yli 7000 km. Slovenian korkein vuori ja maan kansallissymboli Triglav kohoaa 2864 metrin korkeuteen ja perinteisesti valtion presidentti aloittaa virkakautensa kiipeämällä vuoren huipulle. Slovenian vesiputoukset, luonnonpuistot, vuoristot, luolat, suola-altaat ja viinialueet tarjoavat nähtävää pidemmäksikin aikaa.",
    "Tanska Hotel Scandic": "" // No description provided
};

document.getElementById('date').addEventListener('change', function() {
    const returnDateField = document.getElementById('returnDate');
    returnDateField.min = this.value; // Set return date min to selected departure date
});
