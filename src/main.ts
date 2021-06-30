import * as ThreeHelper from './ThreeHelper'
import Stage1 from './stages/stage1';

window.onload = () =>
{
    ThreeHelper.Init();
    ThreeHelper.SetupRoom();
    ThreeHelper.SetupLights();
    ThreeHelper.SetupMoonLight();

    ThreeHelper.animate();
};

window.onresize = () =>
{
    ThreeHelper.UpdateSize();
}

window.onunload = () => ThreeHelper.Cleanup();

ThreeHelper.onReady(() => {
    let loadingScreenOpacity = 1.0;
    
    let loadingScreenFadeOutInt = setInterval(() => {
        loadingScreenOpacity -= 0.1;
        document.getElementById('LoadingScreen')!.style.opacity = loadingScreenOpacity.toString();
        
        if (loadingScreenOpacity < 0.1)
        {
            clearInterval(loadingScreenFadeOutInt);
            document.getElementById('LoadingScreen')?.remove();
    
            Start();
        }
    }, 10);
});

function Start()
{
    let lightToggleContainer = document.getElementById("lightToggleContainer");
    if (lightToggleContainer)
    {
        lightToggleContainer.style.opacity = "0";
        
        for (let i = 0; i < 100; i++)
        {
            setTimeout(() => {
                lightToggleContainer!.style.opacity = (0.01 * (i + 1)).toString();
            }, 10 * i);
        }
        
        lightToggleContainer.style.display = "flex";
        lightToggleContainer.style.flexDirection = "column";
        
        let lightToggle = <HTMLInputElement>lightToggleContainer.querySelector("#lightToggle");
        if (lightToggle)
        {
            lightToggle.checked = false;
            lightToggle.onchange = (event) =>
            {
                if ((<HTMLInputElement>event.currentTarget).checked)
                {
                    Stage1();
                }
            }
        }
    }
}