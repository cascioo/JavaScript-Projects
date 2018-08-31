Graduation = function(){
  if (Scores == Good){
    Grade++;
  }
  if (Grade == 12){
    Graduate = true;
  }
  if (Graduate){
    let Graduates = ["Cam", "Owen"];
    Print("Congratulation " + Graduates[0] + " and " + Graduates[1]);

  } else {
    Print("Try again");
  }
}
