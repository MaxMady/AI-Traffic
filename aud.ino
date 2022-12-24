int ena = 10;
int in1 = 9;
int in2 = 8;
int data;
bool i = true;
void setup() {
  pinMode(ena, OUTPUT);
  pinMode(in1, OUTPUT);
  pinMode(in2, OUTPUT);
  

  Serial.begin(9600); // For the IDE monitor Tools -> Serial Monitor

// Any code that you want to run once....

}

void loop() {
while(Serial.available() > 0)
{
  
  if(i == true) Serial.println(111);
  i = false;
  data = Serial.read();
  Serial.println(data);
  if(data == 'a') {
    digitalWrite(in1, HIGH);
    digitalWrite(in2, LOW);
    digitalWrite(ena, 200);
  } else if(data == 'b') {
    digitalWrite(in1, LOW);
    digitalWrite(in2, HIGH);
    digitalWrite(ena, 200);
  } else {
    digitalWrite(ena, 0);
  }
  digitalWrite(in1, HIGH);
  digitalWrite(in2, LOW);
  digitalWrite(ena, 200);
  Serial.println("Invalid parameter passed!");
}
}