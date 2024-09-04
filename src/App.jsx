import { useState, useCallback, useEffect, useRef } from 'react'

function App() {

  const [length, setLength] = useState(8)
  const [numAllow, setNumAllow] = useState(false)
  const [specCharAllow, setSpecCharAllow] = useState(false)
  const [password, setPassword] = useState("")
  
  //useRef hook 
  const passwordRef = useRef(null);

  const passGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllow) str += "0123456789";
    if (specCharAllow) str += "!@#$%^&*()_+=[]{}~`";

    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  } , [length, numAllow, specCharAllow, setPassword])

  const copy_pass_to_clipboard = useCallback(()=>{
    passwordRef.current?.select()
    // to select any text
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=> {
     passGenerator()
  }, [length, numAllow, specCharAllow, passGenerator])
  return (
    <>
      <div className='w-full h-screen bg-[#1c1917] p-1'>
        <div className="w-[60vw] rounded-md mx-auto my-[10vh] bg-[#f5f5f4] text-[#0c0a09] py-5 px-8  shadow-md">
            <h2 className='text-center text-xl font-semibold'>Password Generator</h2>
            <div className='flex my-4 shadow-md rounded-lg overflow-hidden'
            >
              <input type="text" 
              value={password}
              readOnly
              ref={passwordRef}
               placeholder='Password' className='w-[80%] bg-[#1c1917] text-[#f8fafc] outline-none px-4 py-2 ' />
              <button onClick={copy_pass_to_clipboard} className='w-[20%] font-[500] text-[#f8fafc] bg-blue-500 '>copy</button>
            </div>

            <div className='flex text-sm gap-x-2'>
              <div className='flex items-center gap-x-1'>
                <input type="range"
                min={6}
                max={100}
                value={length}
                className='cursor-pointer'
                onChange={(e) =>{setLength(e.target.value)}}
                />
                <label htmlFor="" className='text-[1.3vw] font-medium ml-3 text-[#1c1917]'>
                  Length :{length}
                </label>
              </div>
              <div className='flex items-center gap-x-1'>
                <input 
                type="checkbox"
                defaultChecked = {numAllow}
                id='numberInput'
                className='ml-12'
                onChange={()=>{
                  setNumAllow((prev) => !prev);
                }}
                />
                <label htmlFor="" className='text-[1.3vw] font-medium ml-1 text-[#1c1917]'>
                  Numbers
                </label>
              </div>
              <div className='flex items-center gap-x-1'>
                <input 
                type="checkbox"
                defaultChecked = {specCharAllow}
                id='specCharInput'
                className='ml-12'
                onChange={()=>{
                  setSpecCharAllow((prev) => !prev);
                }}
                />
                <label htmlFor="" className='text-[1.3vw] font-medium ml-1 text-[#1c1917]'>
                  Special Characters Allowed
                </label>
              </div>
            </div>

        </div>
      </div>
   </>
  )
}

export default App
