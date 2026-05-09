const NOTIFS = [
    { id: 1, icon: 'fa-comment', text: '<strong>Rick Buzztley</strong> replied to your comment in <em>Comprog Study Group</em>.', time: '2 min ago', read: false },
    { id: 2, icon: 'fa-users', text: 'Your join request to <em>AppDev Collab Group</em> was approved.', time: '1 hour ago', read: false },
    { id: 3, icon: 'fa-calendar', text: '<em>Comprog Study Group</em> has a session tonight at 7 PM.', time: '3 hours ago', read: true },
    { id: 4, icon: 'fa-thumbs-up', text: '<strong>Sam Uy</strong> marked your comment as helpful.', time: 'Yesterday', read: true },
];

function renderNotifs() {
    const list = document.getElementById('notif-list');
    const dot  = document.querySelector('.notif-dot');
    const unread = NOTIFS.filter(n => !n.read);
    
    if (dot) dot.style.display = unread.length ? '' : 'none';
    if (!list) return;

    list.innerHTML = NOTIFS.map(n => `
        <div onclick="markRead(${n.id})" style="
            display:flex; gap:12px; align-items:flex-start; padding:11px 16px;
            border-bottom:1px solid rgba(0,0,0,0.05); cursor:pointer; transition:0.15s;
            background:${n.read ? 'white' : '#FFFEF0'};
        " onmouseover="this.style.background='#FFFDF0'" onmouseout="this.style.background='${n.read ? 'white' : '#FFFEF0'}'">
            <div style="width:30px; height:30px; border-radius:50%; background:${n.read ? '#f0ede0' : 'var(--yellow-mid)'}; border:1.5px solid ${n.read ? '#ddd' : 'var(--border-y)'}; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:1px;">
                <i class="fa-solid ${n.icon}" style="font-size:0.75em; color:${n.read ? 'var(--muted)' : 'var(--aged)'}"></i>
            </div>
            <div style="flex:1; min-width:0;">
                <div style="font-size:0.82em; color:#444; line-height:1.5;">${n.text}</div>
                <div style="font-size:0.72em; color:#aaa; margin-top:3px;">${n.time}</div>
            </div>
            ${!n.read ? '<div style="width:7px;height:7px;border-radius:50%;background:var(--orange);flex-shrink:0;margin-top:6px;"></div>' : ''}
        </div>
    `).join('') || '<div style="padding:24px;text-align:center;color:var(--muted);font-size:0.85em;">No notifications</div>';
}

function markRead(id) {
    const n = NOTIFS.find(n => n.id === id);
    if (n) n.read = true;
    renderNotifs();
}

function clearNotifs() {
    NOTIFS.forEach(n => n.read = true);
    renderNotifs();
}

function toggleNotifPanel(e) {
    e.stopPropagation();
    const panel = document.getElementById('notif-panel');
    if (!panel) return;
    const isOpen = panel.style.display === 'block';
    panel.style.display = isOpen ? 'none' : 'block';
    if (!isOpen) renderNotifs();
}

document.addEventListener('DOMContentLoaded', () => {
    const notifBtn = document.getElementById('notif-btn');
    if (notifBtn) {
        notifBtn.addEventListener('click', toggleNotifPanel);
    }

    document.addEventListener('click', (e) => {
        const panel = document.getElementById('notif-panel');
        if (panel && !panel.contains(e.target)) {
            panel.style.display = 'none';
        }
    });

    renderNotifs();
});