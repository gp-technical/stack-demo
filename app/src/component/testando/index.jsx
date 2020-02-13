import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import { actionHub, services, components } from '../../loader'
import styled from 'styled-components'



const localData = 'Essa veio localmente.'

export default () =>
{
    const dispatch = useDispatch()
    const { selector } = services.testando

    // const source = useSelector(state => selector.getSource(state))
    const data = useSelector(state => selector.getData(state))

    const onFetchFromLocal = () => dispatch(actionHub.TESTANDO_FROM_LOCAL(localData))
    const onFetchFromApi = () => dispatch(actionHub.TESTANDO_FROM_API())

    const onReload = () => window.location.reload()
    

    return (
        <components.Box>

            <h3> Data </h3>
            <ul>
                <li>
                    <h4> Source </h4>
                    {/* {source} */}
                </li>
                <li>
                    <h4> Data </h4>
                    {data}
                </li>
            </ul>

            <Divider />

            <ButtonStyled onClick={() => onFetchFromLocal()}>
                Fetch Localmente
            </ButtonStyled>

            <ButtonStyled onClick={() => onFetchFromApi()}>
                Fetch da API
            </ButtonStyled>

            <ButtonStyled variant='contained' onClick={() => onReload()}>
                Restart the App
            </ButtonStyled>

        </components.Box>
    )
}

const ButtonStyled = styled(Button)`
    margin: 12;
`