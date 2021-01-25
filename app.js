document.querySelector('#btn').addEventListener('click', e => {
    e.preventDefault();
    const form = document.querySelector('#form');
    const data = new FormData(form);

    var array = {
        firstname: data.get('firstname'),
        lastname: data.get('lastname'),
        gender: data.get('gender'),
        birth: data.get('birth'),
        email: data.get('email'),
        tel: data.get('tel'),
        status: data.get('status'),
        preference: getChecks(),
    }

    storage(JSON.stringify(array))
    showStorage();

    
})

window.addEventListener('load', () => (showStorage()))

const genderf = g => {
    if(g === 'm'){
        return `<i class="fas fa-venus"></i>`
    }else{
        return `<i class="fas fa-mars"></i>`
    }
}

const birthdate = d => {
    const birthyear = d.split('-')[0];
    const date = new Date();
    const year = date.getFullYear()
    let age = year - birthyear;

    return age
}

const getChecks = () => {
    var array = Array.from(document.getElementsByName('preference'));
    let checks = array.filter( a => (a.checked === true))

    return checks
}

const li = v => {
    return `<li>${v}</li>`;
}


const storage = str => {
    if(localStorage.getItem('clients')){
        let array = JSON.parse(localStorage.getItem('clients'))
        array.push(JSON.parse(str))
        localStorage.setItem('clients', JSON.stringify(array))

        return array
    }else{
        let array = [JSON.parse(str)]
        localStorage.setItem('clients', JSON.stringify(array))
    }
}

const showStorage = () => {
    document.querySelector('.side2').innerHTML = '';
    if(localStorage.getItem('clients')){
        let array = JSON.parse(localStorage.getItem('clients'))
        array.forEach( a => {
            const {firstname, lastname, gender, birth, email, status, tel} = a;
            document.querySelector('.side2').innerHTML += `
            <div class="client">
                <h4> ${genderf(gender)} ${firstname} ${lastname}</h4>
                <p>${birthdate(birth)} años</p>
                <span>${status}</span>
                <ul>
                    
                </ul>
                
                <h4>Contacto</h4>
                <p><i class="fas fa-envelope"></i> ${email}</p>
                <p> <i class="fas fa-mobile-alt"></i> ${tel}</p>
                <button onclick="deleteClient('${firstname}')">Eliminar</button>
            </div>`;
        })

        return

    }else{

        return null
    }
}

const deleteClient = fn => {
    let array = JSON.parse(localStorage.getItem('clients'));
    array = array.filter(objt => objt.firstname !== fn);
    
    localStorage.setItem('clients', JSON.stringify(array));

    showStorage();
}