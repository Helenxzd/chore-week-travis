import React from 'react'
import Chore from "./Chore";
import { render, fireEvent } from '@testing-library/react'

// const Chore = ({ uid, chore })

// <Checkbox checked={checked}
//           data-testid={chore.cid}
//           onChange={handleChange}
//           inputProps={{'aria-label': 'primary checkbox'}}
// />
test('checkbox change status', ()=>{
    const chore = {
        cid: "-M6k2AwDChBxR_mWDQHG",
        dueDate: new Date("Thu Apr 30 2020 23:59:06 GMT+0300 (Eastern Euro..."),
        gid: "personal",
        name: "New_Chore_1",
        status: "incomplete",
        uid: "0uLo2JbLIoNS1iahvsX5Gf4drV32"
    }


    // const { getByTestId } = render(<Chore uid={"0uLo2JbLIoNS1iahvsX5Gf4drV32"} chore={chore}/>);
    // const DIV_ID = "-M6k2AwDChBxR_mWDQHG";
    // const div = getByTestId(DIV_ID);
    // expect(div.textContent).toBe("pending")

    const { getByTestId } = render(<Chore uid={"0uLo2JbLIoNS1iahvsX5Gf4drV32"} chore={chore}/>);

    // const checkbox = getByTestId('checkbox-1234').querySelector('input[type="checkbox"]')
    // expect(checkbox).toHaveProperty('checked', true)
    const checkID = "-M6k2AwDChBxR_mWDQHG";
    const checkbox = getByTestId(checkID).querySelector('input[type="checkbox"]');
    fireEvent.click(checkbox);
    // expect(checkbox).toHaveProperty('checked', true);
    expect(chore.status).toBe("complete");
})
// fireEvent.click(getByTestId('-M6fIkgXdaY_Uyid3F52'))

// This will snapshot only the difference between the first render, and the
// state of the DOM after the click event.
// See https://github.com/jest-community/snapshot-diff
// expect(firstRender).toMatchDiffSnapshot(asFragment())
