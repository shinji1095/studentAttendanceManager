window.onload = function() {
    initializeLiff("1655688058-gxWe16A2");
};

function initializeLiff(myLiffId) {
    liff
        .init({
            liffId: myLiffId
        })
        .then(() => {
            //LINEアプリで起動しているかどうかとログインをしているのかを判断している
            if (!liff.isInClient() && !liff.isLoggedIn()){
                window.alert("LINEアカウントにログインしてください。");
                liff.login();
            }else{
                // start to use LIFF's api
                liff.getProfile().then(async function(profile) {
                    const {userId, displayName} = profile;
                    const hashID = await sha256(userId);
                    document.getElementById("displaynamefield").innerHTML = "こんにちは　" + displayName + "さん";
                    const form = document.getElementById("leaveForm");
                    const LineHashInput = document.createElement("input");
                    LineHashInput.setAttribute("name", "hashID");
                    LineHashInput.setAttribute("value", hashID);
                    LineHashInput.setAttribute("type", "hidden");
                    form.appendChild(LineHashInput);
                    
                }).catch(function(error) {
                    window.alert('Error getting profile: ' + error);
                })
            }
        })
        .catch((err) => {
            document.getElementById('displaynamefield').textContent = err;
        });
}

async function sha256(text){
    const uint8  = new TextEncoder().encode(text)
    const digest = await crypto.subtle.digest('SHA-256', uint8);
    return Array.from(new Uint8Array(digest)).map(v => v.toString(16).padStart(2,'0')).join('')
}

