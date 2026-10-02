const portalData = {
    artists: [
        {
            id: "mc-lirico",
            name: "MC Lírico",
            category: "cantor",
            genre: "Hip Hop",
            bio: "Cantor e compositor focado em retratar as vivências da comunidade piscatória e o quotidiano da ilha.",
            image: "https://images.unsplash.com/photo-1520635959086-522914066aa3?w=500",
            whatsapp: "+258856876733",
            instagram: "https://instagram.com"
        },
        {
            id: "dj-zuca",
            name: "DJ Zuca",
            category: "dj",
            genre: "Afro House",
            bio: "Produtor e DJ residente, criador de batidas contagiantes inspiradas no som das ondas de Inhaca.",
            image: "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?w=500",
            whatsapp: "+258856876733",
            instagram: "https://instagram.com"
        },
        {
            id: "ana-silva",
            name: "Ana Silva",
            category: "cantor",
            genre: "Marrabenta",
            bio: "Voz melodiosa que mistura ritmos tradicionais moçambicanos com harmonias modernas.",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500",
            whatsapp: "+258856876733",
            instagram: "https://instagram.com"
        }
    ],
    tracks: [
        {
            id: 1,
            title: "Praia da Baía",
            artist: "MC Lírico",
            genre: "Hip Hop",
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
            plays: 142,
            downloads: 38
        },
        {
            id: 2,
            title: "Vento de Inhaca",
            artist: "DJ Zuca",
            genre: "Afro House",
            audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
            plays: 230,
            downloads: 75
        }
    ],
    videos: [
        {
            id: 1,
            title: "Bastidores do Sunset na Ilha",
            artist: "DJ Zuca",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
        }
    ],
    events: [
        {
            title: "Sunset Party Inhaca",
            artist: "DJ Zuca & Convidados",
            date: "15 de Outubro, 2026",
            location: "Barreira Beach Club, Ilha de Inhaca"
        }
    ],
    partners: [
        {
            name: "Restaurante Calor Tropical",
            type: "Gastronomia & Lazer",
            desc: "O melhor sabor da Ilha de Inhaca, com marisco fresco e boa música ambiente."
        }
    ]
};

function switchTab(tabId, event) {
    document.querySelectorAll('.section-content').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
    
    window.scrollTo(0, 0);
}

document.addEventListener("DOMContentLoaded", () => {
    renderArtists();
    renderTracks();
    renderVideos();
    renderEvents();
    renderPartners();
    renderHomeHighlights();
});

function renderArtists() {
    const singersGrid = document.getElementById('singers-grid');
    const djsGrid = document.getElementById('djs-grid');
    
    if(singersGrid) singersGrid.innerHTML = '';
    if(djsGrid) djsGrid.innerHTML = '';

    portalData.artists.forEach(artist => {
        const cardHTML = `
            <div class="card">
                <img src="${artist.image}" alt="${artist.name}" class="card-img">
                <div class="card-body">
                    <span class="tag">${artist.genre}</span>
                    <h3 class="card-title">${artist.name}</h3>
                    <p class="card-desc">${artist.bio}</p>
                    <div class="btn-group">
                        <a href="https://wa.me/${artist.whatsapp}?text=Olá%20${encodeURIComponent(artist.name)},%20vi%20o%20teu%20perfil%20no%20Inhaca%20Music%20Hub." target="_blank" class="btn btn-success">💬 WhatsApp</a>
                        <a href="${artist.instagram}" target="_blank" class="btn btn-secondary">📸 Instagram</a>
                    </div>
                </div>
            </div>
        `;

        if (artist.category === 'cantor' && singersGrid) singersGrid.innerHTML += cardHTML;
        if (artist.category === 'dj' && djsGrid) djsGrid.innerHTML += cardHTML;
    });
}

function renderTracks(filteredList = portalData.tracks) {
    const catalog = document.getElementById('tracks-catalog');
    if(!catalog) return;
    catalog.innerHTML = '';

    if (filteredList.length === 0) {
        catalog.innerHTML = `<p style="color: var(--text-muted);">Nenhuma música encontrada.</p>`;
        return;
    }

    filteredList.forEach(track => {
        catalog.innerHTML += `
            <div class="card">
                <div class="card-body">
                    <span class="tag">${track.genre}</span>
                    <h3 class="card-title">${track.title}</h3>
                    <p class="card-desc">Artista: <strong>${track.artist}</strong></p>
                    
                    <div class="audio-box">
                        <audio controls onplay="incrementPlay(${track.id})">
                            <source src="${track.audioUrl}" type="audio/mpeg">
                            O seu navegador não suporta áudio.
                        </audio>
                        <div class="stats-row">
                            <span>▶️ <b id="plays-${track.id}">${track.plays}</b> reproduções</span>
                            <span>📥 <b id="downloads-${track.id}">${track.downloads}</b> downloads</span>
                        </div>
                    </div>

                    <div class="btn-group" style="margin-top: 15px;">
                        <a href="${track.audioUrl}" download class="btn btn-primary" onclick="incrementDownload(${track.id})">📥 Baixar MP3</a>
                    </div>
                </div>
            </div>
        `;
    });
}

function renderVideos(filteredList = portalData.videos) {
    const grid = document.getElementById('videos-grid');
    if(!grid) return;
    grid.innerHTML = '';

    if (filteredList.length === 0) {
        grid.innerHTML = `<p style="color: var(--text-muted);">Nenhum vídeo encontrado.</p>`;
        return;
    }

    filteredList.forEach(video => {
        grid.innerHTML += `
            <div class="card">
                <video controls class="card-video">
                    <source src="${video.videoUrl}" type="video/mp4">
                    O seu navegador não suporta vídeo.
                </video>
                <div class="card-body">
                    <span class="tag">Vídeo Oficial</span>
                    <h3 class="card-title">${video.title}</h3>
                    <p class="card-desc">Artista: <strong>${video.artist}</strong></p>
                </div>
            </div>
        `;
    });
}

function incrementPlay(trackId) {
    const track = portalData.tracks.find(t => t.id === trackId);
    if (track) {
        track.plays++;
        const el = document.getElementById(`plays-${trackId}`);
        if(el) el.innerText = track.plays;
    }
}

function incrementDownload(trackId) {
    const track = portalData.tracks.find(t => t.id === trackId);
    if (track) {
        track.downloads++;
        const el = document.getElementById(`downloads-${trackId}`);
        if(el) el.innerText = track.downloads;
    }
}

function filterArtists(category) {
    const query = document.getElementById(category === 'cantor' ? 'search-singers' : 'search-djs').value.toLowerCase();
    const gridId = category === 'cantor' ? 'singers-grid' : 'djs-grid';
    const grid = document.getElementById(gridId);
    if(!grid) return;
    grid.innerHTML = '';

    const filtered = portalData.artists.filter(a => a.category === category && a.name.toLowerCase().includes(query));

    filtered.forEach(artist => {
        grid.innerHTML += `
            <div class="card">
                <img src="${artist.image}" alt="${artist.name}" class="card-img">
                <div class="card-body">
                    <span class="tag">${artist.genre}</span>
                    <h3 class="card-title">${artist.name}</h3>
                    <p class="card-desc">${artist.bio}</p>
                    <div class="btn-group">
                        <a href="https://wa.me/${artist.whatsapp}" target="_blank" class="btn btn-success">💬 WhatsApp</a>
                        <a href="${artist.instagram}" target="_blank" class="btn btn-secondary">📸 Instagram</a>
                    </div>
                </div>
            </div>
        `;
    });
}

function filterTracks() {
    const query = document.getElementById('search-tracks').value.toLowerCase();
    const filtered = portalData.tracks.filter(t => 
        t.title.toLowerCase().includes(query) || t.artist.toLowerCase().includes(query) || t.genre.toLowerCase().includes(query)
    );
    renderTracks(filtered);
}

function filterVideos() {
    const query = document.getElementById('search-videos').value.toLowerCase();
    const filtered = portalData.videos.filter(v => 
        v.title.toLowerCase().includes(query) || v.artist.toLowerCase().includes(query)
    );
    renderVideos(filtered);
}

function renderEvents() {
    const eventsList = document.getElementById('events-list');
    if(!eventsList) return;
    portalData.events.forEach(ev => {
        eventsList.innerHTML += `
            <div style="background: var(--card-bg); border: 1px solid var(--border-color); padding: 20px; border-radius: 12px; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px;">
                <div>
                    <span class="tag">📅 ${ev.date}</span>
                    <h3 style="font-size: 1.2rem; color: #fff; margin: 5px 0;">${ev.title}</h3>
                    <p style="color: var(--text-muted); font-size: 0.9rem;">Artista(s): ${ev.artist} | Local: ${ev.location}</p>
                </div>
                <a href="https://wa.me/258856876733?text=Quero%20saber%20mais%20sobre%20o%20evento%20${encodeURIComponent(ev.title)}" target="_blank" class="btn btn-primary">Reservar / Info</a>
            </div>
        `;
    });
}

function renderPartners() {
    const partnersGrid = document.getElementById('partners-grid');
    if(!partnersGrid) return;
    portalData.partners.forEach(partner => {
        partnersGrid.innerHTML += `
            <div class="card">
                <div class="card-body">
                    <span class="tag">${partner.type}</span>
                    <h3 class="card-title">${partner.name}</h3>
                    <p class="card-desc">${partner.desc}</p>
                </div>
            </div>
        `;
    });
}

function renderHomeHighlights() {
    const homeGrid = document.getElementById('home-highlights');
    if(!homeGrid) return;
    portalData.artists.slice(0, 2).forEach(artist => {
        homeGrid.innerHTML += `
            <div class="card">
                <img src="${artist.image}" alt="${artist.name}" class="card-img">
                <div class="card-body">
                    <span class="tag">Destaque da Ilha</span>
                    <h3 class="card-title">${artist.name}</h3>
                    <p class="card-desc">${artist.bio}</p>
                </div>
            </div>
        `;
    });
}
