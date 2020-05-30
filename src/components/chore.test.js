import React from 'react'
import Chore from "./Chore";
import { render } from '@testing-library/react'

// const Chore = ({ uid, chore })
test('not display pending', ()=>{
    const chore = {
        cid: "-M6k2AwDChBxR_mWDQHG",
        dueDate: new Date("Thu Apr 30 2020 23:59:06 GMT+0300 (Eastern Euro..."),
        gid: "personal",
        name: "New_Chore_1",
        status: "incomplete",
        uid: "0uLo2JbLIoNS1iahvsX5Gf4drV32"
    }


    const { getByTestId} = render(<Chore uid={"0uLo2JbLIoNS1iahvsX5Gf4drV32"} chore={chore}/>)

// const DIV_ID = "-M8bXDIAWPF3XCYcfy4V"


    const DIV_ID = "-M6k2AwDChBxR_mWDQHG";
    const div = getByTestId(DIV_ID);
    // const style = window.getComputedStyle(div)
    // expect(style.display).toBe("none")
    expect(div.textContent).toBe("pending")
    // expect(div.textContent).toBe('-M6k2AwDChBxR_mWDQHG')
})
// fireEvent.click(getByTestId('-M6fIkgXdaY_Uyid3F52'))

// This will snapshot only the difference between the first render, and the
// state of the DOM after the click event.
// See https://github.com/jest-community/snapshot-diff
// expect(firstRender).toMatchDiffSnapshot(asFragment())
