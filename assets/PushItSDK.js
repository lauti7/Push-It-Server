//TODO: Fetch with app id, config of prompts

function showSlide() {
  console.log('Showing Promp Slide');
  const template =
  `<div style="width:400px;
    height: 150px;
    padding: 10px 0;
    background-color:rgb(255, 255, 255);
    border: 2px solid rgb(244, 244, 244);
    box-shadow: -3px 3px 1px 1px rgba(0,0,0,0.05);
    position: absolute;
    top:0;
    left: 50%;
    right: 50%;
    margin-left:-150px;">
    <div style="display:flex;">
      <img  style="width: 130px; height:115px;" src="http://localhost:8000/assets/notificationbell1.gif" alt="Notificatio Bell" />
      <span><p style="padding-top:5px;">Do you like to receive notifications from us?</p></span>
    </div>
    <div style="width:100%; display: flex; justify-content:space-around; align-content: center;margin-left: 5px; margin-bottom: 5px;">
      <div>
        <button style="background-color:rgb(20, 141, 232); padding:10px 15px;  color: white; font-size: 0.8em; border: 1px solid rgb(20, 141, 232); border-radius:3px" onClick="acepptPushPromt(event)" id='allow'>Allow</button>
      </div>
      <div>
        <button style="background-color:rgba(63, 65, 62, 0.66); padding:10px 15px;  color: white; font-size: 0.8em; border: 1px solid rgba(63, 65, 62, 0.66); border-radius:3px" onClick="denyPushPrompt(event)"  id='deny'>Deny</button>
      </div>
    </div>
  </div>`
  document.body.innerHTML += template
}
