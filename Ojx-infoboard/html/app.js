window.addEventListener("message", (event) => {
  switch (event.data.action) {
    case "open":
      Open(event.data);
      break;
    case "close":
      Close();
      break;
    case "setup":
      Setup(event.data);
      break;
  }
});
window.addEventListener('load', function () {
  console.log('Ojx info board Loadded 💌')
})

const Open = (data) => {
  $(".infoboard-main").fadeIn(150);
  $("#total-players").html("<p>" + data.players + " of " + data.maxPlayers + "</p>");
  $("#total-cops").html("<p>" + (data.currentCops > 0 ? data.currentCops : '<i class="fas fa-times"></i>') + "</p>");
  $("#total-ambulance").html("<p>" + (data.currentAmbulance > 0 ? data.currentAmbulance : '<i class="fas fa-times"></i>') + "</p>");

  $("#ojx-cash").html("<p>" + data.cash + "$</p>");

  $.each(data.requiredCops, (i, category) => {
    var beam = $(".scoreboard-info").find('[data-type="' + i + '"]');
    var status = $(beam).find(".info-beam-status");

    if (category.busy)
      $(status).html('<i class="fas fa-clock"></i>');
    else if (data.currentCops >= category.minimumPolice)
      $(status).html('<i class="fas fa-check"></i>');
    else
      $(status).html('<i class="fas fa-times"></i>');
  });
};

const Close = () => {
  $(".infoboard-main").fadeOut(150);
};


const Setup = (data) => {
  let scoreboardHtml = "";
//   scoreboardHtml += `
//   <div class="moneyicon-ojxiscool-nicely"></div>
//   <div id="ojx-cash" class="money-ojxiscool-nicely"></div>
// `;
  $.each(data.items, (index, value) => {
    scoreboardHtml += `
      <div class="scoreboard-info-beam" data-type=${index}>
        <div class="info-beam-title">
            <p>${value}</p>
        </div>
        <div class="info-beam-status"></div>
      </div>
    `;
  });
  scoreboardHtml += `
  <div class="ojxmini-header">
      <p>Players info</p>
  </div>
`;
  scoreboardHtml += `
  <div class="scoreboard-info-beam">
    <div class="info-beam-title-players">
      <p>Online Cops</p>
    </div>
    <div class="info-beam-status" id="total-cops" style="color: #ededed"></div>
  </div>
`;
scoreboardHtml += `
  <div class="scoreboard-info-beam">
    <div class="info-beam-title-players">
      <p>Online EMS & pillbox employees</p>
    </div>
    <div class="info-beam-status" id="total-ambulance" style="color: #ededed"></div>
  </div>
`;
  scoreboardHtml += `
    <div class="scoreboard-info-beam somthingrandom">
      <div style="color:#121212;" class="info-beam-title-players">
        <p>Total Players</p>
      </div>
      <div class="info-beam-status" id="total-players" style="color: #121212"></div>
    </div>
  `;
  $(".scoreboard-info").html(scoreboardHtml);
};
