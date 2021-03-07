import React, { useState } from 'react';
import ChildServer from './ChildServer';
import ParentServer from './ParentServer';
const { desktopCapturer } = require('electron')




export default (props)=>{

  let [ctx,setCtx] = useState(undefined);

  function handleStream (stream) {
    // const video = document.querySelector('video')
    const video = ctx;
    video.srcObject = stream
    video.onloadedmetadata = (e) => video.play()
  }

  function handleError (e) {
    console.log(e)
  }


  function ask(){
    console.log("asked")
    desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async sources => {
      console.log(sources)
      for (const source of sources) {
        if (source.name === "Entire Screen") {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({
              audio: false,
              video: {
                mandatory: {
                  chromeMediaSource: 'desktop',
                  chromeMediaSourceId: source.id,
                  minWidth: 1280,
                  maxWidth: 1280,
                  minHeight: 720,
                  maxHeight: 720
                }
              }
            })
            console.log("ASKED")
            handleStream(stream)
          } catch (e) {
            handleError(e)
          }
          // return
        }
      }
    })

  }




  return <div className="RecorderContainer">
    <div style={{margin:'0 auto'}}>
      <ParentServer />
    </div>
    <hr />
    <br />
    <ChildServer />
    <hr />
    <br />
    <a>Screen Sharing Options</a>
    <div>
      <button className="btn btn-default"  onClick={ask}><span className="icon icon-play"></span> Share Screen</button>
      <button className="btn btn-default"><span className="icon icon-pause"></span> Pause Sharing</button>
      <button className="btn btn-default"><span className="icon icon-stop"></span> End Sharing</button>
    </div>
    {/* <video src="" ref={sctx=>{
        setCtx(sctx);
      }}></video> */}


  </div>

}
