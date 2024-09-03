 
 let tokens=[];
 function  tokenizer (input){
  
    
    let current=0;
    let tokens=[];
  
  
   
    
    while (current < input.length) {
    let char = input[current];
    if (/\s/.test(char)) {
    current++;
    continue;
    }
    
    const NUMBER_REGEX = /[0-9]|\./;
    if (NUMBER_REGEX.test(char)) {
    let value = '';
    while (NUMBER_REGEX.test(char)) {
    value += char;
    
    char = input[++current];
   
    }
  
    tokens.push({ type: 'number', value });
    continue;
    }
    
    const LETTER_REGEX = /#|[a-zA-Z_]|,.+=-*\//;
    if (LETTER_REGEX.test(char)) {
    let value = '';
    while (LETTER_REGEX.test(char) || char === '#') {
    value += char;
    char = input[++current];
    }
    
    if (value.startsWith('#')) {
    tokens.push({ type: 'variable', value: value.substring(1) });
    } else if (value==='tan'||value==='sin'||value==='cos'||value==='funga'||value==='fungua'||value==='Data'||value==='andika'||value==='thibitisha'||value==='prompti'||value==='kwakila'||value==='weka'||value==='mwisho'||value==='kwenye'||value==='tafuta'||value === 'kazi' || value === 'onesha' || value=='wakati'||value === 'ikiwa' || value === 'kama'||value=='namba'||value=='sentensi'||value=='wakati'||value=='Math'||value==='chukua'||value==='async'||value==='await'||value==='rudisha'||value==='vib') {
    
    tokens.push({ type: 'keyword', value });
    }
    else if (value==='++'||value==='--'||value==='*='||value==='-='||value==='/='){
    
    
    tokens.push({ type: 'DO', value });
    
    }
    
    
    
    
    else if (value === 'elementi') {
    
    tokens.push({ type: 'elementi', value });
    } else if (value === 'sikiliza') {
    tokens.push({ type: 'sikiliza', value });
    } else {
    
    tokens.push({ type: 'identifier', value });
    }
    
    continue;
    }
    
    const OPERATOR_REGEX = /[`\;\*\-\~\=\|.\:'!\+~|&#$@\-*/%?=,\\\(<>),{.#};" \""\_\n \[ \]]/;
    if (OPERATOR_REGEX.test(char)) {
    
    tokens.push({ type: 'operator', value: char });
    
    
    
    current++;
    continue;
    }
    
    
    throw new TypeError('Unknown character: ' + char );
    }
    
    return tokens;
    }
    
    
    
    
   
 
   
 
 
   
   
   
   
   
   
   
   
   
   
   
   
   function parser(tokens) {

    let current = 0;
    
    
    var ST={op:0,
    all:false,
    aa:false,
      
    };
         
    
    function parseExpression() {
    let token = tokens[current];
     
       if(tokens[current].type==='identifier' && tokens[current+1].value==='.'){
    
   
   //something like a.length;_bb.v;
   
   
   
   
      if (tokens[current].type === 'identifier' && tokens[current+1].value === '.'&&tokens[current+2].value!='weka') {
    let val=''
    
    while(tokens[current].value!=';'){
    
    val+=tokens[current].value
    current++;
    }
    
    
    current++
    
    return{type:'ObjCall',val}
    
    }
    
    
    
    
    
 
    let pushV=''
    let kwakila=''
    let Arrname=tokens[current].value;
    
    current+=2;
    
    if(tokens[current].type=='keyword'){
    
    
    if(tokens[current].value==='weka'){
    current+=2;
    
    while(tokens[current].value!=')'){
    pushV +=tokens[current].value;
    current++;
    }
    
    
    
    }
    
    
    
    else if(tokens[current].value==='kwakila'){
    
    kwakila=tokens[current].value;
    current+=2;
    
    while(tokens[current].value!=')'){
    pushV +=tokens[current].value;
    current++;
    }
    
    
    
    }
    
    
    
    
    
    
    
    
    }
    current+=1;
    
    
    return{type:'push',Arrname,pushV}
    }
    
    
    
    
    
  
    
   else  if(tokens[current].type==="identifier" && tokens[current+1].value==="["){
    
    
    let Arrname=tokens[current].value;
    let arrIndex='';
    let after=''
    current+=2;
    
    if(tokens[current].value!=']'){
    
    while(tokens[current].value!=']'){
    
    arrIndex +=tokens[current].value
    current++;
    
    }
    
    
    current++
    
   
    if(tokens[current].value==='='){
    current++
    while(tokens[current].value!=';'){
    
    after+=tokens[current].value;
    current++
    
    }
    current+=1
    
    }
   
    
    
 
    }
  
   
    
    return{type:'xx',Arrname,arrIndex,after}
    }
    
    
    
    
    else if(tokens[current].type==='identifier' && tokens[current+1].value==='{'){
   
    let ObjV=''
    let Objname=tokens[current].value;
    
    current+=1;
    
  
     
       
       
       
let body = ""
  let ST = { op: 0 };
  if (tokens[current].value === '{') {
    ST.op += 1;
    
 body+=tokens[current].value
 current++
  }
  
  while (ST.op != 0) {
  
   if (tokens[current].value == "{") {
 ST.op+=1;
     body+=tokens[current].value
     current++
    }
    
    body+=tokens[current].value
    
    if (tokens[current].value == "}") {
      ST.op -= 1;
      
      
    }
    
  
  
    current++
  
  }
  
  
  
  if (ST.op === 0) {
   
       
       
       
       
       return{ type:'ObjData',Objname,body}}
    
    }
    
    
    
    
    
    
  else  if (tokens[current].type === 'number' || tokens[current].type === 'variable'||( tokens[current].type==='identifier' && tokens[current+1].value !="=" && tokens[current+1].value!='(')||tokens[current].type==='"') {
    
    
    let value=''
    if(token.value==='"'){
    value+='"'
    current++
    while(token.value !=='"'){
    value=tokens[current].value
    current++
    }
    value+='"'
    
    
    }
    value=tokens[current].value
    
    
    current+=1;
    
    return { type: 'Literal',value };
    
    
    } 
    
    
    

else  if(tokens[current].type==='identifier' && (tokens[current+1].value==='('||tokens[current+3].value==='(' &&tokens[current+2].type!='keyword')){

let args=''
let name=''

if(tokens[current+1].value==='('){
name=tokens[current].value;

current+=1;
if(tokens[current].value=='('){
current+=1;


 args=parseArgumentList()
current++
}}
else{
  while(tokens[current].value!='('){
    
    name+=tokens[current].value
    current++
  }
  current+=1
  args=parseArgumentList()
  current++
}
//current+=2;
//alert(tokens[current].value)
return{type:'funcCall',name,args}
}


    
    
 
    
else  if(tokens[current].type==='identifier' && (tokens[current+1].value==='+'||tokens[current+1].value==='-'||
tokens[current+1].value==='/'||
tokens[current+1].value==='%')){
  
  let body=''
  while(tokens[current].value!=';'){
    body+=tokens[current].value;
  current++
    
  }
  current++
  return{type:'math',body}
}
    
  
    
    
    
    
    
    
    
       
    
    
    //here thers modification buss
    
    
    else if(tokens[current].type==='identifier' && tokens[current+1].value==='='){
      
      
      
      let isFetch=false
      var p=false;
    let isAngle=false
    let angleName=''
   
    let v2='';let v1=tokens[current].value;
    current+=2;
    if(tokens[current].type=='identifier'||tokens[current].type==='elementi' ||tokens[current].type==='keyword'||tokens[current].type==="operator"||tokens[current].type==="number"){
      

      
      
    if((tokens[current].value==='cos')||(tokens[current].value==='sin')){
    isAngle=true;
    
    
    angleName=tokens[current].value;
  v2=parseExpression()
  
  
  
//  alert(v2)
  //alert(tokens[current].value)
  //remember to work with noe
  }
  else if(tokens[current].type=="keyword"&&tokens[current].value==='await'){
    isFetch=true
   
   //while(tokens[current].value!=";"){
    v2=parseExpression()
    
    current++
   // alert(tokens[current].value)
    v2=parseExpression()
    
    //current++
  // }
   // current++
  //  alert(tokens[current].value)
  // alert(v2.arg)
//alert(v22)
//v2=`${v2} ${v22 }`
}
  else{
  //current++
  
  if(tokens[current].value==='prompti'){
  p=true;
  v2=parseExpression()
  
  }
  if(tokens[current].value==='thibitisha'){
  
  v2=parseExpression()
  
  }
    if(tokens[current].value==='elementi'){
  
  v2=parseExpression()
  
  }
  
  
    while(tokens[current].value!=';'){
    
    v2+=tokens[current].value
    current++
    
   
    }
    
    current++
    
  }
    
 

    }
    
  
  //current+=1;


    return{type:'Assignment',v1,v2,isAngle,isFetch,angleName,p}
    }
    
    
    
    
    //above was a modification with no bound ****
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

    
    
    
    //theres a modification above
    
    
    
    
    
    else if (token.type === 'keyword' &&(token.value === 'andika'||token.value === 'thibitisha' ||token.value === 'prompti'||token.value === 'onesha'||token.value === 'funga'||token.value === 'fungua')) {
    
    var met=tokens[current].value;
    current++;
    
    let expression=""
    let isString=false
    if (tokens[current].type === 'operator' && tokens[current].value === '(') {
    
    current++;
   
   if(tokens[current].type=="operator" && tokens[current].value==='"'){
   
   
   expression=""
   isString=true;
   current++
   while(tokens[current].value!=='"'){
   
   expression+=tokens[current].value
   current++
   
   
   }
   current++
   
   }
    if(tokens[current].type==="identifier"){
    
  
   
    
    
    
    expression =parseExpression();
    
    
    }
    
    if(tokens[current].type==="number"){
    
    
    
    
    
    
    expression =parseExpression();
    
    
    }
    
    if (tokens[current].type === 'operator' && tokens[current].value === ')') {
 
    current+=1;
    
    if(met==='onesha'){
    
  return { type: 'PrintStatement', value:expression,isString};
    
    }else if(met==='andika'){
    
    
    
    return { type: 'andika', value:expression,isString};
    
    }else if(met==='thibitisha'){
    
    
    
    return { type: 'thibitisha', value:expression,isString};
    
    }else if(met==='prompti'){
    
    
    return { type: 'prompti', value:expression,isString};
    
    }
    else if(met==='funga'){
    
    
    return { type: 'funga', value:expression,isString};
    
    }
    else if(met==='fungua'){
    
    
    return { type: 'fungua', value:expression,isString};
    
    }
    
    
    
    } else {
    throw new SyntaxError('Missing closing parenthesis  ');
    }
    } else {
    throw new SyntaxError('Missing opening parenthesis');
    }
    }
    
    
    //#####here.   alert()  thers modification in this room###
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    //#######some matha values has been added today#########
    
    else if (token.type === 'keyword' && token.value === 'namba') {
    
    
    current++;
    let value,name=tokens[current].value;
    
    current++;
    
    
    if(tokens[current].value=="="){
    
    current++;
    
    value=tokens[current].value
    
    }
    current+=1
    
    return {type:'_D',name,value}
    }
    
    
    //here there is modification
    
    
    
    
    
    else if (tokens[current].type === 'keyword' && tokens[current].value === 'cos'|| tokens[current].value ==='sin'|| tokens[current].value ==='tan' ||tokens[current].value ==='randam') {
    
  
    let angle=tokens[current].value;
    
    let expression=""
    current++
    if (tokens[current].type === 'operator' && tokens[current].value === '(') {
    current++;
    
    if(tokens[current].type==="identifier"){
   
   
   
  while(tokens[current].value!=')'){
    expression+=tokens[current].value;
    current++
    
   }
   
    
    }
    
   
    
    
    if (tokens[current].type === 'operator' && tokens[current].value === ')') {
    
    current+=1;
    //alert(tokens[current].value)
    return { type: 'mathAngle',angle,expression};
    } else {
    throw new SyntaxError('Missing closing parenthesis');
    }
    }
    
    
    
    
    else {
    throw new SyntaxError('Missing opening parenthesis');
    }
    }
    
    
    
    
    
   
    
    
    
    
    
    
    
    
    
     
    
    
    
    
    
    
    
    
    
  
    else if (token.type === 'keyword' && token.value === 'Data') {
    
    
    current++;
    let value='';
    let name=tokens[current].value;
    
    current++;
    
    
    if(tokens[current].value=="{"){
    
    current++;
    
    while(tokens[current].value!='}'){
    
    
    value +=tokens[current].value
    
  current++;
    }
    
    current+=1;
    
    
        return {type:'Obj',name,value}
    }
    
    
    
    
else if(tokens[current].value=="[" && tokens[current +1].value==="]"){
    
    current+=2;
    
    
    return {type:'Arr',name}
    }
    







    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    else if (token.type === 'keyword' && token.value === 'sentensi') {
    current++;
    let name=tokens[current].value;
    let string=""
    current++;
    
    let value
    if(tokens[current].value=="="){
    
    current++;
    }
    
    value=tokens[current].value
    
    
    if (value === '"') {
    
    current++
    
    
    while (tokens[current].value !== '"') {
    string += tokens[current].value
    
    
    current++
    
    }
    
    
    current+=1
    
    
    
    }
    
    
    return {type:'v',name:name,string}
    }
    
    
    
    //here theres modification
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    else if (token.type === 'elementi' && token.value === 'elementi') {
    
    var isD=false
    
    
    
    
    
    
    let elementMethod= token.value;
    current++
    if(tokens[current].value=="("){
    current++;
    
    
    
    let value=tokens[current].value
    
    
    
    if (value === '"') {
    
    
    let string = '';
    let selectorType=''
    
    while (tokens[current++] !== ',') {
    
    selectorType += tokens[current].value;
    
    
    
    break;
    
    }
    
    
    current+=1
    
    while (tokens[current++] !== '"' && tokens[current].value!=',') {
    
    string += tokens[current].value;
    
    
    
    break;
    
    
    
    }
    
    
    let strin,body,args
    
    let method=tokens[current + 3].value
    
    if(method=="."){
    current+=4;
    let methods=tokens[current].value
    
    
    if(tokens[current].value=='stailiRangi'||'kontentiNdani'||'kontenti'||'stailiRangiElementi'||'stailiUre'||'stailiUp'||'stailiMwonekano'||'sikilizaTukio'||'choraMstari'||'lineTo'||'kanvaStaili'||'kanvaMstatili'||'kanvaManeno'||'kontexti'||'kanvaFonti'||'kanva' ){
   let valuex ="";
    
   
    if(tokens[current].value!='sikilizaTukio'){
      valuex =tokens[current+2].value;
    if(valuex.startsWith('"')){
   current+=3;
   
   while(tokens[current].value!='"'){
   
   valuex +=tokens[current].value
   current++;
  
   }
   valuex +='"'
  
    isD=true;
    }
   
    }
   
    if(tokens[current].value=='sikilizaTukio'){
    current+=2;
   
  
    let value=tokens[current].value
  
    let event="";
    if (value === '"') {
    
    while (tokens[current++] != ',') {
    
    event+= tokens[current].value;
    
    
    
    break;
    
    }
    
    
   
    current+=1
    
    
    
    
    while (tokens[current++] !== '"' && tokens[current].value!=',') {
    
    
    
    
    break;
    
    
    
    }
    
    
    
    current++
    
    strin=tokens[current].value
    if(strin=="kazi"){
      
    current+=2;
    
    args=parseArgumentList()
    current+=1;
    
    
    
    
    
    
let body = []
  let ST = { op: 0 };
  if (tokens[current].value === '{') {
    ST.op += 1;
  }
  
  while (ST.op !== 0) {
  
    if (tokens[current].value == "{") {
  
      body.push(parseExpression())
      current++
    }
 
    body.push(parseExpression())
    if (tokens[current].value == "}") {
      ST.op -= 1;
      body.push(parseExpression())
      current++
    }
    //  
  
  
    //current++
  
  }
  
  
  
  if (ST.op === 0) {
    //alert(body)
  
 
  
  
    
    }
    
    
    
    
    
    current+=2;
 
 
 
 
    return {type:'elem',selectorType,args,body,event,string}
    
    }
      
      
    }
      
      
    }
    
    
    else if(tokens[current].value==="kontexti"){
      let m=''
      let cv=""
      let mv=""
      current+=2
      while(tokens[current].value!=')'){
        cv+=tokens[current].value
        
        current++
        
      }
      current+=2
      
      if(
        tokens[current].value==='kanvaMstatili'
      ||
        tokens[current].value==='kanvaStaili'
      
      ||
        tokens[current].value==='kanvaText'
      
      ||
        tokens[current].value==='jaza'
      
     ||
        tokens[current].value==='kanvaFonti'
      ||tokens[current].value==='kanvaManeno'
      
      ){
        m=tokens[current].value
        
        current+=2
        while(tokens[current].value!=')'){
          
          mv+=tokens[current].value
          
          current++;
          
        }
        current++
        
        
        
        
       
        
       
      }
      
      
      
      
      
      
      
      
      
      
      
      
      
      
       
        return{type:'canva',cv,mv,m,selectorType,string}
        
      
      
    }
    
    
    
    
    
    
    
    
    
    
    else{
    if(isD){
   
    current+=1}else{current+=3;}
   
   
    
   if(tokens[current].value==')'){
   
  
    current++
  
  
    
    return { type:'Elementi',selectorType,string,methods,valuex,isD}
    
   } } 
    
    
    
    }
    
    
    else{
    
    
  
  
    
    
    return{   type:'El',selectorType,string,}
    
    
    }
    
    
    }
    
    
    
    }
    
    
    
    
    }
    
    }
    
    
    
   
    
    
    
    else if (token.type === 'keyword' && token.value === 'kazi') {
    
  
    current++;
    if (tokens[current].type === 'identifier') {
    let functionName = tokens[current].value;
    current++;
    if (tokens[current].type === 'operator' && tokens[current].value === '(') {
    current++;
    let arguments = parseArgumentList();
    
    
    if (tokens[current].type === 'operator' && tokens[current].value === ')') {
    current+=1;
    
    

    
    
    
    
    
    
let body = []
  let ST = { op: 0 };
  if (tokens[current].value === '{') {
    ST.op += 1;
  }
  
  while (ST.op !== 0) {
  
    if (tokens[current].value == "{") {
  
      body.push(parseExpression())
      current++
    }
 
    body.push(parseExpression())
    if (tokens[current].value == "}") {
      ST.op -= 1;
      body.push(parseExpression())
      current++
    }
    //  
  
  
    //current++
  
  }
  
  
  
  if (ST.op === 0) {
    //alert(body)
  
 
  
  

    
    
    
    
    
    return { type: 'FunctionDeclaration', name: functionName, arguments,body }};
   
   
   
   
   
   
   
   
    } else {
    throw new SyntaxError('Missing closing parenthesis');
    }
    } else {
    throw new SyntaxError('Missing opening parenthesis');
    }
    } else {
    throw new SyntaxError('Missing function name');
    }
    }
    
    
    
    
    
        else if (tokens[current].type === 'keyword' && tokens[current].value === 'async') {
    let val=tokens[current].value
    current++
    return{type:'async',val}
          
        }
    
    
    
    
        else if (tokens[current].type === 'keyword' && tokens[current].value === 'await') {
          
    let val=tokens[current].value
    
    return{type:'await',val}
          
        }
    
    
    
    
    
        else if (tokens[current].type === 'keyword' && tokens[current].value === 'rudisha') {
         
          current++
          var val=""
          if(tokens[current].type==='operator'&&tokens[current].value==="{"){
            while(tokens[current].value!='}'){
    val+=tokens[current].value
            current++
            }
            val+=tokens[current].value
          current++
           // alert(val)
          }else if(tokens[current].type==='identifier'){
            val=tokens[current].value
          
          
    current+=2
            
          }
    //alert(tokens[current].value)
 //  alert(val)
    return{type:'return',val}
          
        }
    
    
    
    
    
    
    
    else if (tokens[current].type === 'keyword' && tokens[current].value === 'chukua') {
    
    current++
    if(tokens[current].type==='operator' && tokens[current].value==='('){
   var arg=""
    current++
    while(tokens[current].value!==';'){
    arg=parseArgumentList()
    current++
    }
    }
    
    
  current++
  
    return{type:'fetch',arg}
    
    
    
    
    }
    
    
    
    
   ///here
   
   
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
  
    
  
    
  else if ( tokens[current].value == '{') {
   let v=''
    if(ds.ax){
      v=':'
    }else{
    
    v = tokens[current].value}
    
    return { type: 'opbrace', v }
  
  }
    else if(tokens[current].value=='}'){
     
     let v=''
      if(ds.ax){
        v='break;'
      }else{
        v=tokens[current].value}
     
      return{type:'clbrace',v}
    }
    
    
    
    else if (token.type === 'keyword' && token.value === 'ikiwa') {
      
    current++;
    if (tokens[current].type === 'operator' && tokens[current].value === '(') {
    current+=2
    
  
    let initName=""
    while(tokens[current].value!=";"){
      initName+=tokens[current].value;
      current++
    }
    
    
   
    
    
    
    let initialization=initName;
    
    
    
    
    current+=1
    let condition=""
    while(tokens[current].value!==';'){
  
    condition += tokens[current].value;
    
    
    current++}
    
    current+=1
    let update =""
    while(tokens[current].value!==')'){
    
    
    update+=tokens[current].value
    current++}
    
    
    
    
    
    
    
    
    
    
    if (tokens[current].type === 'operator' && tokens[current].value === ')') {
    current+=1;
    let body=[]
    let ST={op:0};
if(tokens[current].value==='{'){
  ST.op+=1;
}
    
   while(ST.op!==0){
     
     if (tokens[current].value == "{") {
       
           body.push(parseExpression())
        current++ }
        
     body.push(parseExpression())
     if(tokens[current].value=="}"){
       ST.op-=1;
       body.push(parseExpression())
       current++
   }
   //  

  
  //current++
   
   }
      
   
   
   if(ST.op===0){
    //alert(body)
    return { type: 'for',initialization,condition,update,body };}
    } 
    
    
    else {
    throw new SyntaxError('Missing closing parenthesis');
    }
    } else {
    throw new SyntaxError('Missing opening parenthesis');
    }
    }
    
    
    
    
    
    
    
    
    
    else if (token.type === 'keyword' && token.value === 'wakati') {
    let body=""
    current++;
    
    
    if (tokens[current].type === 'operator' && tokens[current].value === '(') {
    current++;
    
    
    
    let condition =""
    
    while(tokens[current].value!==')'){
    
    condition +=tokens[current].value
    current++}
    
    
    
    
    
    if (tokens[current].type === 'operator' && tokens[current].value === ')') {
    current+=1;
    
    
    
    let body=[]
    let ST={op:0};
if(tokens[current].value==='{'){
  ST.op+=1;
}
    
   while(ST.op!==0){
     
     if (tokens[current].value == "{") {
       
           body.push(parseExpression())
        current++ }
        
     body.push(parseExpression())
     if(tokens[current].value=="}"){
       ST.op-=1;
       body.push(parseExpression())
       current++
   }
   //  

  
  //current++
   
   }
      
   
   
   if(ST.op===0){
    //alert(body)
   
    
    
    return { type: 'while', condition, body };
   
   }
   
   
    } else {
    throw new SyntaxError('Missing closing parenthesis');
    }
    } else {
    throw new SyntaxError('Missing opening parenthesis');
    }
    } 
    
    
    
    
    
    
    
    
    
    
    
    else if (token.type === 'operator' && token.value === '(' && tokens[current+1].value!==')' && ST.all===true) {
   
    current+=1
    
    let condition=''
    while(tokens[current].value!=')'){
    condition+=tokens[current].value
    
    current++
    }
    
   // current+=1
   
  
    current++
    
    
    let body = []
    let ST = { op: 0 };
    if (tokens[current].value === '{') {
      ST.op += 1;
    }
    
    while (ST.op !== 0) {
    
      if (tokens[current].value == "{") {
    
        body.push(parseExpression())
        current++
      }
      
      body.push(parseExpression())
      if (tokens[current].value == "}") {
        ST.op -= 1;
        body.push(parseExpression())
        current++
      }
      //  
    
    
      //current++
    
    }
    
    
    
    if (ST.op === 0) {
      //alert(body)
    
    
    
    
    
    
    
    
    return{type:'ElseIf',body,condition}}
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
  /*  
    
    else if (tokens[current].type === 'operator' ) {
    
    current++
    }
    
    */
    
    
    
    
    
    
    
    
    
    
    
    
   
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    else if (tokens[current].type ==="operator" && tokens[current].value==="(" &&tokens[current+1].value===')' && ST.all===true) {
    
   current+=2;
    
    
    let body = []
    let ST = { op: 0 };
    if (tokens[current].value === '{') {
      ST.op += 1;
    }
    
    while (ST.op !== 0) {
    
      if (tokens[current].value == "{") {
    
        body.push(parseExpression())
        current++
      }
     
      body.push(parseExpression())
      if (tokens[current].value == "}") {
        ST.op -= 1;
        body.push(parseExpression())
        current++
      }
      //  
    
    
      //current++
    
    }
    
    
    
    if (ST.op === 0) {
     
    
    ST.all=false;
    
    
    return{type:'Else',body}}
    }
    
    
    
    
      else if (tokens[current].type === 'keyword' && tokens[current].value === 'kwenye'|| tokens[current].value === 'mwisho') {
 let a_=tokens[current].value
 if(a_=='kwenye'){
   a_='case'
 }
      else{
        a_='default'
      }
    current++
    let a=''
    while(tokens[current].value!=':'){
      a+=tokens[current].value
      current++
      
  
    }
    
    return{type:'case',a,a_}
    
      }
      
     
    
    
    
    
    
    
    
      else if (tokens[current].type === 'operator' && tokens[current].value === ':') {
        
       
       current++
      
    
    
    
    
    
      let body = []
      let ST = { op: 0 ,};
      if (tokens[current].value === '{') {
        
        ST.op += 1;
      }
      
      while (ST.op !== 0) {
      
        if (tokens[current].value == "{") {
     ds.ax=true
          body.push(parseExpression())
          current++
        }
        //alert(tokens[current].value)
        body.push(parseExpression())
        if (tokens[current].value == "}") {
          ST.op -= 1;
          ds.ax=true
          body.push(parseExpression())
          current++
        }
        //  
      
      
        //current++
      
      }
      
      
      
      if (ST.op === 0) {
        //alert(body)
     // alert(ds.ax)
      ds.ax=false
   
      
        return { type: 'todo',body}
    
    
    
    
    
    
    
    
      }
      
      
      }
      
    
    else if (tokens[current].type === 'keyword' && tokens[current].value === 'tafuta') {
      
      current+=2
      let condition=''
      while(tokens[current].value!=')'){
        condition+=tokens[current].value;
        current++
        
        
      }
      
     
      current+=1;
      
      
      
      let body = []
      let ST = { op: 0,};
      if (tokens[current].value === '{') {
        
        ST.op += 1;
      }
      
      while (ST.op !== 0) {
      
        if (tokens[current].value == "{") {
      
          body.push(parseExpression())
          current++
        }
        //alert(tokens[current].value)
        
        body.push(parseExpression())
        if (tokens[current].value == "}") {
          ST.op -= 1;
          body.push(parseExpression())
          current++
        }
        //  
      
      
        //current++
      
      }
      
      
      
      if (ST.op === 0) {
        
      
      
      
      
        return { type: 'switch', condition, body }
      };
      
      
      
    }
    
    
    
    
    
    
    
    else if (token.type === 'keyword' && token.value === 'kama') {
    ST.all=true;
    current++;
    
    
    if (tokens[current].type === 'operator' && tokens[current].value === '(') {
    current++;
    
    
    
    let condition =""
    while(tokens[current].value!==')'){
    
    condition +=tokens[current].value
    current++
    }
    
    
    
    if (tokens[current].type === 'operator' && tokens[current].value === ')') {
   
    current+=1;
  
        
  // alert(condition)
  
  
let body = []
  let ST = { op: 0 };
  if (tokens[current].value === '{') {
    ST.op += 1;
  }
  
  while (ST.op !== 0) {
  
    if (tokens[current].value == "{") {
  
      body.push(parseExpression())
      current++
    }
// alert(tokens[current].value)
    body.push(parseExpression())
    if (tokens[current].value == "}") {
      ST.op -= 1;
      body.push(parseExpression())
      current++
    }
    //  
  
  
    //current++
  
  }
  
  
  
  if (ST.op === 0) {
    //alert(body)
  
 
  
  
    return { type:  'IfStatement', condition:condition,body}};
    
    } else {
    throw new SyntaxError('Missing closing parenthesis');
    }
    } else {
    throw new SyntaxError('Missing opening parenthesis');
    }
    } 
    
    
    
    
    
 
    
    
    
    
    else {
    throw new SyntaxError('Unexpected token: ' + token.value);
    }
    
    
    
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    function parseArgumentList() {
    let arguments = [];
    
    while (tokens[current].type === 'identifier') {
    arguments.push(tokens[current].value);
    current++;
    if (tokens[current].type === 'operator' && tokens[current].value === ',') {
    current++;
    } else {
    break;
    }
    }
   // current++
    
    return arguments;
    }
    
    
    
    
    var ds={ax:false}
    
    
    
    
    
    
    
    
    function parseStatements() {
    let statements = [];
    
    
    while (current < tokens.length) {
    
    if (tokens[current].type === 'keyword' && tokens[current].value === 'onesha') {
    
    statements.push(parseExpression());
    }
    
    else if (tokens[current].type === 'DO') {
    
    statements.push(parseExpression());
    }
    
    
    
     
    
    
    
    else if (tokens[current].type === 'variable') {
    
    statements.push(parseExpression());
    }
    else if (tokens[current].type === 'identifier' && tokens[current+1].value==='.') {
    statements.push(parseExpression());
    }
    else if (tokens[current].type === 'identifier') {
    statements.push(parseExpression());
    }
    
    else if (tokens[current].value==='mwisho') {
    statements.push(parseExpression());
    }
    
    
    else if (tokens[current].type==='operator'&&tokens[current].value===':') {
    statements.push(parseExpression());
    }
    else if ( tokens[current].type==='keyword' && tokens[current].value==='Data') {
    statements.push(parseExpression());
    }
    
    
    else if ( tokens[current].type==='keyword' && tokens[current].value==='kwenye') {
    statements.push(parseExpression());
    }
    
    
    
    
else  if(tokens[current].type==='identifier' && (tokens[current+1].value==='+'||tokens[current+1].value==='-'||
tokens[current+1].value==='/'||
tokens[current+1].value==='%')){
      statements.push(parseExpression());
    
    }
    
  
    
    
    else if(tokens[current].type=="identifier" && tokens[current +1].value=="["){
    
    
    statements.push(parseExpression());
    
    }
    
    
    
    else if (tokens[current].type === 'identifier' && tokens[current+1].value=='(') {
   
    statements.push(parseExpression());
    
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    else if(tokens[current].type=='operator'&& tokens[current].value=='}'){
     
        statements.push(parseExpression());
      
    }
    
    
    else if(tokens[current].type=='operator'&& tokens[current].value=='{'){
     
        statements.push(parseExpression());
      
    }
    
    
    
    
    
    else if (tokens[current].type === 'keyword' && tokens[current].value === 'fungua') {
    statements.push(parseExpression());
    }
    
    
    
    
    else if (tokens[current].type === 'keyword' && tokens[current].value === 'funga') {
    statements.push(parseExpression());
    }
    
    
    
    
    else if (tokens[current].type === 'keyword' && tokens[current].value === 'prompti') {
    statements.push(parseExpression());
    }
    
    
    
    
    else if (tokens[current].type === 'keyword' && tokens[current].value === 'andika') {
    statements.push(parseExpression());
    }
    
    
    
    
    
    else if (tokens[current].type === 'keyword' && tokens[current].value === 'fungua') {
    statements.push(parseExpression());
    }
    
    
    
    
    else if (tokens[current].type === 'keyword' && tokens[current].value === 'thibitisha') {
    statements.push(parseExpression());
    }
    
    
    
    else if (tokens[current].type === 'keyword' && tokens[current].value === 'kazi') {
    statements.push(parseExpression());
    }
    
    
    else if (tokens[current].type === 'keyword' && tokens[current].value==='chukua') {
    statements.push(parseExpression());
    }
    
    
    else if (tokens[current].type === 'elementi' && tokens[current].value === 'elementi') {
    statements.push(parseExpression());
    }
    
    
    else if (tokens[current].type === 'sikiliza' && tokens[current].value === 'sikiliza') {
    statements.push(parseExpression());
    }
    
    
    
    else if (tokens[current].type === 'keyword' && tokens[current].value === 'tafuta') {
    statements.push(parseExpression());
    }
    
    
    
    
    
      else if (tokens[current].type === 'keyword' && tokens[current].value === 'kwenye'|| tokens[current].value === 'mwisho') {
            statements.push(parseExpression());
    }
    
 
    
      else if (tokens[current].type === 'operator' && tokens[current].value === ':') {
            statements.push(parseExpression());
    }
    
      
    

    
    
    
    
    else if (tokens[current].type === 'keyword' && tokens[current].value === 'namba') {
    statements.push(parseExpression());
    }
    
    
    
    else if (tokens[current].type === 'keyword' && tokens[current].value === 'wakati') {
    statements.push(parseExpression());
    }
    
    
    
    else if (tokens[current].type === 'number') {
    statements.push(parseExpression());
    }
    
    
    
    else if (tokens[current].type === 'keyword' && tokens[current].value === 'sentensi') {
    statements.push(parseExpression());
    }
    
    
    else if (tokens[current].type === 'keyword' && tokens[current].value === 'sin') {
    statements.push(parseExpression());
    } 
    else if (tokens[current].type === "operator" && tokens[current].value === "(" && tokens[current + 1].value != ')' && ST.all === true) {
      statements.push(parseExpression());
    }
    
    
    
    else if (tokens[current].type ==="operator" && tokens[current].value==="(" &&tokens[current+1].value===')' && ST.all===true) {
      
  statements.push(parseExpression());}
   
    
    else if (tokens[current].type === 'keyword' && tokens[current].value === 'cos') {
    statements.push(parseExpression());
    } 
    
    
    
    
    else if (tokens[current].type === 'keyword' && tokens[current].value === 'await') {
    statements.push(parseExpression());
    } 
    
    
    else if (tokens[current].type === 'keyword' && tokens[current].value === 'async') {
    statements.push(parseExpression());
    } 
    
    
    
    else if (tokens[current].type === 'keyword' && tokens[current].value === 'rudisha') {
    statements.push(parseExpression());
    } 
    
    
    
    else if (tokens[current].type === 'keyword' && tokens[current].value === 'ikiwa') {
    statements.push(parseExpression());
    } 
    
    else if (tokens[current].type === 'keyword' && tokens[current].value === 'kama') {
    statements.push(parseExpression());
    } else {
    throw new SyntaxError('Unexpected token: ' + tokens[current].value);
    }
    }
    
    return statements;
    
    
    
    }
    
    
    return parseStatements();
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    function generateCode(ast) {
    
    
    let code = '';
    
    let cu=0;
    function traverse(node) {
    
   
  
    
    if(node.type=="Literal"){
    
   
    
    let a=`  ${node.value}  \n`
    return code=node.value;
    
    
    }
    
    
    
    else if(node.type=="thibitisha"){
    
    if(node.isString){
    
    cu++
    return code=`  confirm("${node.value}");`
    }else{cu++
    
    return code=` confirm(${node.value.value});`;
    
    }
    
    }
    
    
    
    else if(node.type=="fungua"){
    
    if(node.isString){
    
    cu++
    return code=`  window.open("${node.value}");`
    }else{cu++
    
    return code=` window.open(${node.value.value});`;
    
    }
    
    }
    
    
    
    
    else if(node.type=="funga"){
    
    if(node.isString){
    
    cu++
    return code=`  window.close("${node.value}");`
    }else{cu++
    
    return code=` window.close(${node.value.value});`;
    
    }
    
    }
    
    
    
    
    else if(node.type=="andika"){
    
    if(node.isString){
    
    cu++
    return code=`  document.write("${node.value}");`
    }else{cu++
    
    return code=` document.write(${node.value.value});`;
    
    }
    
    }
    
    
    
    
    
    
    
    
    else if(node.type=="prompti"){
    
    if(node.isString){
    
    cu++
    return code=`  prompt("${node.value}");`
    }else{cu++
    
    return code=` prompt(${node.value.value});`;
    
    }
    
    }
    
    
    
    
    
    
    
    
    
    else if(node.type=="PrintStatement"){
     
    if(node.isString){
    
    cu++
   return code=`  alert("${node.value}");`
    }else{cu++
   
return code=` alert(${node.value.value});`;
    
    }
    
    }
    
    
    
    
    
    
    
   else if(node.type=="xx"){
   let a= node.Arrname
   let b=node.arrIndex
   let c=node.after
   
     cu++
   
    return  code=`${a}[${b}]=${c};\n`
    
     
    }
    
    
    
    
    
    else if(node.type==="math"){
     
      let z=node.body+'\n';
        
         return code=z
      }
      
      
    
    
    
    
    
    else if(node.type=="Obj"){
    
    
    let x=node.name
    let y=node.value
    cu++
    let z=`  ${x} ={ ${y} };\n`
    
    return code=z
    
    
    }
    
    
    
    else if(node.type=="Arr"){
    
    
    let x=node.name
    
    let z=`const ${x} =[];\n`;
    
    cu++
    return code=z;
    
    
    }
    
    
    else if(node.type=="ObjCall"){
    
    
    let x=` \n ${node.val}  `
    
    
    
    cu++
    
    return code=x;
    
    
    }
    
    
    
    else if(node.type=="push"){
    
    
    let x=node.Arrname
    let y=node.pushV;
    
    let z=`${x}.push(${y});\n`;
    
    return code=z;
    
    
    }
    
    
    
    
    else if(node.type=="Assignment"){
    let c=''
    let z=''
    let y=''
    
    let x=node.v1
     
    
    
    
    if(node.isFetch){
     
    
    y=`  ${node.v1}=${traverse(node.v2)}  ;\n`
      
     return code=y
    }
    

    if(node.isAngle){
      
      
      
    let y=node.v2.expression
    let a=node.angleName
    z=`${x}=Math.${a}(${y}); \n`
    
    
    }
    else{
    
    if(node.p){
    c = traverse(node.v2)
    
    
    
    y=c;
    
    z=`${x}=${y} \n`
    
    return code=z
    }
    else if(!node.p){
    
   
    c = node.v2
    
    y=c;
    
    z=`${x}=${y}  \n`
    return code=z
    }
    
   
    y=node.v2
    
     z=`${x}=${y};  \n`
     }
     cu++
     
    return code=z;
    
    
    }
    
    
    
    
    else if(node.type=="mathAngle"){
    
    
    let x=node.angle
    let y=node.expression
    
    let z=`Math.${x}(${y});\n`
   
    return code=z;
    
    
    }
    
   
   
   
   
   
   
   
   
   
   
   
   
   
    else if(node.type=="switch"){
     
     let d=node.condition
     let a = 0
     let c = ''
     
     function xyz() {
       //traverse(ast[a])
     
       c += traverse(node.body[a])
       // alert(c)
     }
     while (a < node.body.length) {
     
       xyz()
       a++
     
     }
     
     
     let co=`switch(${d}) ${c}`
     
     
     
     
      return code =co
    }
    
    
   
   
   
   
   
   
   
    else if(node.type=="case"){
     let d=`${node.a_} ${node.a}`
      return code =d
    }
    
   
   
   
    else if(node.type=="todo"){
     
     
     
    
     let a = 0
     let c = ''
     
     function xyz() {
       //traverse(ast[a])
     
       c += traverse(node.body[a])
       // alert(c)
     }
     while (a < node.body.length) {
     
       xyz()
       a++
     
     }
     
     
      return code =c
    }
    
   
   
   
    else if(node.type=="fetch"){
     
     
     
   return code =`await fetch(${node.arg})`
    
    }
    
    
    else if(node.type=="async"){
     
     
     
      return code =` ${node.val}   `
    }
    
    
    
    else if(node.type=="await"){
     
   
     
      return code =`     ${node.val}   `
    }
    
    else if(node.type=="return"){
     
     
     
      return code =`return  ${node.val} \n`
    }
    
    
    
    
    else if(node.type=="opbrace"){
     
     
     
      return code =`${node.v}\n`
    }
    
    
    
    else if(node.type=="clbrace"){
     
      return code =`${node.v}\n`
    }
    
    
    
    else if(node.type=="_D"){
    
  
    
    return  code=`
    var ${node.name} =${node.value};\n`;
    
    
    }
    else if(node.type=="v"){
    
   
    
    return code=`var ${node.name} ="${node.string}";\n`;
    

    }
    
    
    
    else if(node.type=="FunctionDeclaration"){
    

let a = 0
   let c = ''
   
   function xyz() {
    
     
     
     //traverse(ast[a])
   
     c += traverse(node.body[a])
  
   }
   
   while (a < node.body.length) {
   
     xyz()
     a++
   
   }
   
  
     
    return code = `function ${node.name}(${node.arguments.join(', ')}) ${c}\n`;
    
    }
    
    
    else if(node.type=="funcCall"){
    
   return code = ` ${node.name}(${node.args});\n`
   
    
    }
    
    
    
    
    
    
    else if(node.type=="IfStatement"){
    
    
    
    
    
    
    

let a = 0
   let c = ''
   
   function xyz() {
    
     
     
     //traverse(ast[a])
   
     c += traverse(node.body[a])
  
   }
   
   while (a < node.body.length) {
   
     xyz()
     a++
   
   }
   
   
    
    
    
    
    
    return   code = `    \n if (${node.condition}) ${c}     \n`;
   
   
   
    }
    
    
    
    
    
    
    
    
    else if(node.type=="Else"){
    
let a = 0
   let c = ''
   
   function xyz() {
    
     
     
     //traverse(ast[a])
   
     c += traverse(node.body[a])
  
   }
   
   while (a < node.body.length) {
   
     xyz()
     a++
   
   }
   
    
    return  code =` else ${c}\n`;
    }
    
    
    
    
    else if(node.type=="ElseIf"){
    
    
    
let a = 0
   let c = ''
   
   function xyz() {
    
     
     
     //traverse(ast[a])
   
     c += traverse(node.body[a])
  
   }
   
   while (a < node.body.length) {
   
     xyz()
     a++
   
   }
   
    
    
    
    return code = `else if(${node.condition})${c}  `;
    
    
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    else if(node.type=="while"){
    
    
      let v= `while (${node.condition})`
      

    let a=0
    let c=''
    function xyz(){
      //traverse(ast[a])
      
      c+=traverse(node.body[a])
     // alert(c)
}
    while(a<node.body.length){
      
      xyz()
      a++
      
    }
    
   let b=`${v}${c} \n`
   return c=b;
    }
    
    
    
    /*
    else if(node.type=="fetch"){
    
    return code+= `fetch(${node.url}, {
    method: '${node.method}',
    headers:${node.meta},
    body: JSON.stringify(${node.body})
    })
    .then(${node.args}=> ${node.res}).then(${node.args2}=> {
    
    ${node.res2}
    })`
    
    
    
    
    
    
    }
    */
    
    
    
    
    
    
    
    else if(node.type==='canva'){
    //  alert(node.string)
    let z=""
    let s=false
     let a=`document.querySelector("#${node.string}")`
     let b=''
    if (node.m==='kanvaStaili'){
      b='fillStyle'
      s=true
    }else if(node.m==='jaza'){
      b='fill'
    }else if(node.m==='kanvaFonti'){
      
      
      b='font'
      s=true
    }else if(node.m==='kanvaManeno'){
      
      
      b='fillText'
   
    }else if(node.m==='kanvaMstatili'){
      
      
      b='fillRect'
    }else{}
    
    
    if(s){
      
      
      z=`${a}.getContext(${node.cv}).${b}=${node.mv};\n`
      
    }else{
      
      z=`${a}.getContext(${node.cv}).${b}(${node.mv});\n`
      
    }
    
    
  //  alert(b)
 //    alert(z)
     return code=z
     
    }
    
    
    
    
    else if(node.type=="Elementi"){
    
    let m=node.methods
    
    let v=""
    v=node.valuex;
    
    
    let sel =node.selectorType;
    
    
    
    
    if(sel=="id"){
    let res=""
    if(m=="stailiRangi"){
    
    res  ='style.color ='
    
    }
    else if(m=="stailiRangiElementi"){
    res='style.backgroundColor='}
    else if(m=="stailiUre"){
    res='style.height='}
    else if(m=="stailiUp"){
    res='style.width='}
    
    else if(m=="stailiMwonekano"){
    res='style.display='
    if(node.value=="onekana"){
    v=" "}
    if(node.value=="usionekane"){
    v="none"
    }
    }
    else if(m=="kontentiNdani"){
    
    
    res='innerHTML='  }
    else if(m=="kontenti"){
    res ='value'}
    else if(m=="sikilizaTukio"){
    
    }else {}
    
    if(m =="kontentiNdani"){
    
    
    
    
       return code = `document.querySelector("#${node.string}").${res}${v};`;
    
    
  
    
    }else{
    
    return code +=`document.querySelector("#${node.string}").${res} "${v}";`;}
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    else if(sel=="class"){
    let res=""
    if(m=="stailiRangi"){
    
    res  ='style.color ='
    
    }
    else if(m=="stailiRangiElementi"){
    res='style.backgroundColor='}
    else if(m=="stailiUre"){
    res='style.height='}
    else if(m=="stailiUp"){
    res='style.width='}
    
    else if(m=="stailiMwonekano"){
    res='style.display='
    if(node.value=="onekana"){
    v=" "}
    if(node.value=="usionekane"){
    v="none"
    }
    }
    else if(m=="sikilizaTukio"){
      alert("in")
    
    }
    
    
    
    
    
    
    else if(m=="konteniNdani"){
    res='innerHTML='}
    else if(m=="kontenti"){
    res ='value'}else{
    }
    
    
    
    return   code = `document.querySelector(".${node.string}").${res}"${v}"`;
    
    }
    else if(sel=="name" ){
    
    let res=""
    if(m=="stailiRangi"){
    
    res  ='style.color ='
    
    }
    else if(m=="stailiRangiElementi"){
    res='style.backgroundColor='}
    else if(m=="stailiUre"){
    res='style.height='}
    else if(m=="stailiUp"){
    res='style.width='}
    
    else if(m=="stailiMwonekano"){
    res='style.display='
    if(node.value=="onekana"){
    v=" "}
    if(node.value=="usionekane"){
    v="none"
    }
    }
    else if(m=="konteniNdani"){
    res='innerHTML +='}
    else if(m=="kontenti"){
    res ='value'}else{
    }
    
    
    return   code = `document.querySelector("${node.string}").${res}${v}`;
    
    }
    
    
    }
    
    else if(node.type=="elem"){
      
      
    if(node.selectorType=="id"){
    
    
    
    

let a = 0
   let c = ''
   
   function xyz() {
    
     
     
     //traverse(ast[a])
   
     c += traverse(node.body[a])
  
   }
   
   while (a < node.body.length) {
   
     xyz()
     a++
   
   }
   
   
    
    
    
    
    
    
    
    
    
    
    return code =`document.querySelector("#${node.string}").addEventListener("${node.event}", function(${node.args.join(', ')}) ${c})`;
    }  }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    else if(node.type==='ObjData'){
      
      
      
      
      
   
   
      
      
      
      
     return code=`${node.Objname}=${node.body};\n`
     
    }
    
    
    
    else if(node.type=="for"){
     // alert('im')
   let x=node.initialization
   
   let y=node.condition
   let z=node.update
   
   
let a = 0
   let c = ''
   
   function xyz() {
     
     //traverse(ast[a])
     
   
     c += traverse(node.body[a])
   
     
   }
   
   while (a < node.body.length) {
   
     xyz()
     a++
   
   }
   
   
   
   
   
 
    cu++
  return  code=`for( var ${x};${y};${z})
      ${c}
   
  \n  `
      
      
    }
    
    
    
    
    
    
    
    
    
    else{
    
    
    // throw new Error('Unknown construct '+ 
    node.value
    
    }
    
    }
    let a=0
    let c=''
    function xyz(){
      //traverse(ast[a])
      
      c+=traverse(ast[a])
     // alert(c)
}
    while(a<ast.length){
      
      xyz()
      a++
      
    }
    
    
    return code=c}
    
    
    var f=`elementi("id , jj").kontenti(aa)
 
    `
    
    
    
    var d=new tokenizer(f)
    
   var i= new parser(d)
   
 var day=generateCode(i);
 console.log(day)
//var kiswahiliScript=  Function(day)
 
 //kiswahiliScript()
 
  //document.getElementById("donut").innerHTML=day
   /* i.forEach(c=>{
      
      alert(c.type)
    })*/
    
    
    
    