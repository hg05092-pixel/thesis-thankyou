import React,{useState} from "react";
import {createRoot} from "react-dom/client";
import "./styles.css";

const GAS_URL="https://script.google.com/macros/s/AKfycbwZBHMdOpudQ8sdEgyN842exJchhRlyxh1xjqCkER-7f7Cs7UmEM3UV0q7YBD22_T89_w/exec";
const thesisOptions=[["yes","석사학위 논문을 받고 싶어요","📚"],["no","논문은 받지 않아도 됩니다","🌷"]];
const giftOptions=[["coupon","배달의민족 3만원 쿠폰을 받고 싶어요","🍔"],["meal","만나서 식사를 하고 싶어요","🍽️"]];

function App(){
 const [step,setStep]=useState(0),[name,setName]=useState(""),[thesis,setThesis]=useState(""),[gift,setGift]=useState(""),[error,setError]=useState(""),[busy,setBusy]=useState(false);
 const t=thesisOptions.find(x=>x[0]===thesis)?.[1]||"",g=giftOptions.find(x=>x[0]===gift)?.[1]||"";
 const start=()=>{if(!name.trim())return setError("이름을 먼저 입력해주세요 😊");setError("");setStep(1)};
 const submit=async()=>{if(!thesis||!gift)return setError("모든 항목을 선택해주세요.");setBusy(true);setError("");
 try{await fetch(GAS_URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({name:name.trim(),totalQuestions:2,answers:{thesis,gift}})});setStep(4)}
 catch(e){setError("제출 중 문제가 생겼어요. 다시 시도해주세요.")}finally{setBusy(false)}};
 return <main className="app"><div className="blob one"/><div className="blob two"/><section className="card">
 <div className="top">THANK YOU {step>0&&step<4?<span>{step} / 2</span>:null}</div>
 {step===0&&<Screen><div className="emoji">🎓</div><p className="eyebrow">작은 감사의 마음</p><h1>덕분에<br/><span>졸업할 수 있었습니다.</span></h1><p className="desc">인터뷰에 참여해 주신 덕분에<br/>무사히 석사학위 논문을 완성할 수 있었어요.<br/>귀한 시간과 이야기를 나눠주셔서 진심으로 감사합니다 💛</p><label>인터뷰 참여자 이름<input value={name} onChange={e=>setName(e.target.value)} placeholder="이름을 입력해주세요" onKeyDown={e=>e.key==="Enter"&&start()}/></label><Error text={error}/><button onClick={start}>시작하기 →</button></Screen>}
 {step===1&&<Question n="01" title={<>석사학위 논문을<br/>받아보고 싶으신가요?</>} opts={thesisOptions} val={thesis} set={setThesis} next={()=>{if(!thesis)return setError("하나를 선택해주세요 😊");setError("");setStep(2)}} error={error}/>}
 {step===2&&<Question n="02" title={<>어떤 방식으로<br/>감사의 마음을 전할까요?</>} opts={giftOptions} val={gift} set={setGift} next={()=>{if(!gift)return setError("하나를 선택해주세요 😊");setError("");setStep(3)}} error={error}/>}
 {step===3&&<Screen><div className="emoji small">💌</div><p className="eyebrow">YOUR CHOICES</p><h2>{name}님이 선택하신 내용이에요.</h2><div className="summary"><div><small>질문 1</small><b>{t}</b></div><div><small>질문 2</small><b>{g}</b></div></div><p className="note">선택하신 내용을 확인해주세요.<br/>맞다면 아래 제출 버튼을 눌러주세요.</p><Error text={error}/><div className="row"><button className="secondary" onClick={()=>setStep(2)}>다시 선택</button><button onClick={submit} disabled={busy}>{busy?"보내는 중...":"제출하기 💛"}</button></div></Screen>}
 {step===4&&<Screen><div className="emoji">🎉</div><p className="eyebrow">THANK YOU SO MUCH</p><h1>정말 감사합니다,<br/>{name}님!</h1><p className="desc">보내주신 이야기와 시간 덕분에<br/>제가 무사히 졸업할 수 있었습니다.<br/>오래오래 기억할게요 💛</p><div className="heart">♡</div><button className="secondary" onClick={()=>{setStep(0);setName("");setThesis("");setGift("");}}>처음으로</button></Screen>}
 </section><footer>made with gratitude</footer></main>
}
function Screen({children}){return <div className="screen">{children}</div>}
function Error({text}){return text?<p className="error">{text}</p>:null}
function Question({n,title,opts,val,set,next,error}){return <Screen><div className="qnum">{n}</div><p className="eyebrow">ONE LITTLE QUESTION</p><h2>{title}</h2><div className="opts">{opts.map(o=><button className={"option "+(val===o[0]?"selected":"")} onClick={()=>set(o[0])} key={o[0]}><i>{o[2]}</i><span>{o[1]}</span><b>{val===o[0]?"✓":""}</b></button>)}</div><Error text={error}/><button onClick={next}>다음으로 →</button></Screen>}
createRoot(document.getElementById("root")).render(<App/>);