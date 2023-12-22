import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

function WordleKeyboard({onKeyPress}: {onKeyPress: any}) {
    return (
    <Keyboard
        onKeyPress={onKeyPress}
        theme="hg-theme-default keyboard"
        layout={{
        default: [
            "Q W E R T Y U I O P",
            "A S D F G H J K L",
            "{enter} Z X C V B N M {bksp}"
        ],
        
        }}
        buttonTheme={[
        {
            class: "text-black",
            buttons: "Q W E R T Y U I O P A S D F G H J K L Z X C V B N M {bksp} {enter}"
        }
        ]} 
        display={{
        '{bksp}': 'back',
        '{enter}': 'enter'
        }}

    />)
}

  export default WordleKeyboard;