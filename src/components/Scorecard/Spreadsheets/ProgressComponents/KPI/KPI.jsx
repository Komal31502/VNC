import React, { useContext, useState } from 'react'
import { SpreadsheetContext } from '../../../../../context/SpreadsheetContext';
import { TableCell, TableRow, TextField } from '@mui/material';
import EditKPI from '../../SheetActions/EditKPI/EditKPI';
import axios from 'axios';
import { rootUrl } from '../../../../../Constants';
import { useAutosave } from 'react-autosave';


const KPI = ({handleRowClick, index, spreadsheet,kp}) => {
    const { getKPIComments, type, setType, kpis, getSpreadsheetTable } = useContext(SpreadsheetContext);
    const [edit, setEdit] = useState({
        index: -1,
        ind: -1
    })
    const [kPI, setKpi] = useState({});
    const [editKPIShow, setEditKPIShow] = useState(false);
    const handleEditKPIHide = () => setEditKPIShow(false);
    const handleKPI = async (data) => {
        const kpivalues = type?.rowData;
        
        delete kpivalues.notes;
        delete kpivalues.delete_flag;
        delete kpivalues.orow;
        delete kpivalues.oname;
        delete kpivalues.actual;
        delete kpivalues.performance;
        await axios.post(`${rootUrl}/ObjectiveServlet?action=update&arg=kpi&arg1=${type?.rowData?.oid}`,
            {
                ...kpivalues,
                ...data,
                owner: "amaiello",
                performance_function: "average",
                actual_values: kpis?.filter((kp) => kp.id === type.id)[0]?.actual_values ? kpis?.filter((kp) => kp.id === type.id)[0]?.actual_values : [],
                planned_values: kpis?.filter((kp) => kp.id === type.id)[0]?.planned_values ? kpis?.filter((kp) => kp.id === type.id)[0]?.planned_values : []
              
            }
        )
            .then((res) => {
                getSpreadsheetTable();
                setEdit({ index: -1, ind: -1 });
            })
            .catch((error) => {
                console.log(error)
            })

    }
    useAutosave({ data: kPI, onSave: handleKPI, saveOnUnmount: false });
   
    const handleExit = () => {
        setEdit({ index: -1, ind: -1 })
    }
    return (
        <>
          
                <TableRow key={index}
                    sx={{
                        '&.MuiTableRow-root.Mui-selected': { backgroundColor: "#b4e0e0" },
                    }}
                    onMouseLeave={() => handleExit()}
                    onClick={() => { setType((prev) => ({ ...prev, name: "kpi", id: kp.id, rowData: kp }));  }}
                 
                 
                    selected={type.name === "kpi" && type.id === kp.id}
                    onContextMenu={(e) => { e.preventDefault(); setType((prev) => ({ ...prev, name: "kpi", id: kp.id, rowData: kp })); getKPIComments(kp.id); handleRowClick(e); }}>
                                {
                                    spreadsheet === "Progress" ?
                                        <>
                                            <TableCell padding='none' sx={{ width:"30%",paddingLeft:"7%"}}                     onMouseLeave={() => handleExit()}>
                                            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                                               <div style={{display:"flex",alignItems:"center"}}>
                                                <img alt="" src="/images/scorecard/spreadsheets/table-icons/KPI.svg"  />
                                                {
                                                    edit.index === index && edit.ind === 0 ?
                                                        <TextField inputProps={{ inputMode: 'numeric' }} id="standard-basic" variant="standard"
                                                            onBlur={() => handleExit()}
                                                            onKeyDown={(e) => {
                                                                if (e.key === "Enter") {
                                                                    handleExit()
                                                                }
                                                            }
                                                            }
                                                            defaultValue={kp.title}
                                                            onChange={(e) => {
                                                                if (e.target.value !== "") {
                                                                    setKpi((prev) => ({ ...prev, title: e.target.value }))
                                                                }
                                                            }}
                                                        /> :
                                                        <span style={{ paddingLeft: "8px"}} onClick={() => setEdit((prev) => ({ ...prev, index: index, ind: 0 }))}>
                                                            {kp.title ? kp.title : kPI.title}
                                                        </span>
                                                }
                                                </div>
                                                <span className={kp?.indicator_type === "leading" ? "indicators-icon-leading" : kp?.indicator_type === "" ? "" : "indicators-icon-lagging"}>
                                                <img alt="" src={kp.indicator_type === "leading" ? "/images/scorecard/spreadsheets/table-icons/leading.svg" : kp?.indicator_type === "" ? "" : "/images/scorecard/spreadsheets/sidebar/arrow-down-right.svg"} />
                                                </span>
                                                </div>
                                            </TableCell>
                                            <TableCell align='center' sx={{ width:"10%"}}>
                                                <img alt="" src="/images/scorecard/spreadsheets/table-icons/edit.svg" style={{ cursor: "pointer" }} onClick={() => {setEditKPIShow(true); getKPIComments(kp.id);}} />
                                            </TableCell>
                                            <TableCell align="center" sx={{ width:"10%"}} onClick={() => setEdit((prev) => ({ ...prev, index: index, ind: 1 }))}>
                                                {
                                                    edit.index === index && edit.ind === 1 ?
                                                        <TextField inputProps={{ inputMode: 'numeric' }} size="small" id="standard-basic" variant="standard"
                                                            defaultValue={kp.quant_weight}
                                                            onBlur={() => handleExit()} onKeyDown={(e) => {
                                                                if (e.key === "Enter") {
                                                                    handleExit()
                                                                }
                                                            }
                                                            }
                                                            onChange={(e) => {
                                                                if (e.target.value !== "")
                                                                    setKpi((prev) => ({ ...prev, quant_weight: e.target.value }))
                                                            }

                                                            }

                                                             /> :
                                                        kp.quant_weight
                                                       
                                                }
                                            </TableCell>
                                            <TableCell align="center" sx={{ width:"10%"}} onClick={() => setEdit((prev) => ({ ...prev, index: index, ind: 2 }))}>
                                                {
                                                    edit.index === index && edit.ind === 2 ?
                                                        <TextField inputProps={{ inputMode: 'numeric' }} size="small" id="standard-basic" variant="standard"
                                                            onBlur={() => handleExit()} onKeyDown={(e) => {
                                                                if (e.key === "Enter") {
                                                                    handleExit()
                                                                }
                                                            }
                                                            }
                                                            defaultValue={kp.measure}
                                                            onChange={(e) => {
                                                                if (e.target.value !== "")
                                                                    setKpi((prev) => ({ ...prev, measure: e.target.value }))
                                                            }
                                                            } /> :
                                                        kp.measure
                                                    
                                                }</TableCell>
                                            <TableCell align="center"  sx={{ width:"10%"}} onClick={() => setEdit((prev) => ({ ...prev, index: index, ind: 3 }))}>
                                                {
                                                    edit.index === index && edit.ind === 3 ?
                                                        <TextField inputProps={{ inputMode: 'numeric' }} size="small" id="standard-basic"
                                                            variant="standard"
                                                            defaultValue={kp.baseline}
                                                            onBlur={() => handleExit()} onKeyDown={(e) => {
                                                                if (e.key === "Enter") {
                                                                    handleExit()
                                                                }
                                                            }
                                                            }
                                                            onChange={(e) => {
                                                                if (e.target.value !== "")
                                                                    setKpi((prev) => ({ ...prev, baseline: e.target.value }))
                                                            }



                                                            }
                                                        /> :
                                                        kp.baseline
                                                           
                                                }

                                            </TableCell>
                                            <TableCell align="center" sx={{ width:"10%"}}  onClick={() => setEdit((prev) => ({ ...prev, index: index, ind: 4 }))}>
                                                {
                                                    edit.index === index && edit.ind === 4 ?
                                                        <TextField inputProps={{ inputMode: 'numeric' }} size="small" id="standard-basic" variant="standard"
                                                            defaultValue={kp.value}
                                                            onBlur={() => handleExit()} onKeyDown={(e) => {
                                                                if (e.key === "Enter") {
                                                                    handleExit()
                                                                }
                                                            }
                                                            }
                                                            onChange={(e) => {
                                                                if (e.target.value !== "")
                                                                    setKpi((prev) => ({ ...prev, value: e.target.value }))
                                                            }



                                                            }

                                                            



                                                            

                                                        /> :
                                                        kp.value
                                                    
                                                }
                                            </TableCell>
                                            <TableCell align="center" sx={{ width:"10%"}}  onClick={() => setEdit((prev) => ({ ...prev, index: index, ind: 5 }))}>
                                                {
                                                    edit.index === index && edit.ind === 5 ?
                                                        <TextField inputProps={{ inputMode: 'numeric' }} size="small" id="standard-basic" variant="standard"
                                                            defaultValue={kp.target_value}
                                                            onBlur={() => handleExit()} onKeyDown={(e) => {
                                                                if (e.key === "Enter") {
                                                                    handleExit()
                                                                }
                                                            }
                                                            }
                                                            onChange={(e) => {
                                                                if (e.target.value !== "")
                                                                    setKpi((prev) => ({ ...prev, target_value: e.target.value }))
                                                            }
                                                            } /> :
                                                        kp.target_value
                                                            }
                                                           
                                                
                                            </TableCell>
                                            <TableCell align="right" sx={{ width:"10%"}}  onClick={() => setEdit((prev) => ({ ...prev, index: index, ind: 6 }))}>
                                                {
                                                    `${Number.isInteger(kp?.progress)?Number(kp?.progress):Number(kp?.progress).toFixed(2)}%`
                                                }
                                            </TableCell>
                                        </> :
                                        <>
                                            <TableCell padding='none' sx={{ width:"30%",paddingLeft:"7%"}} size="large" onMouseLeave={() => handleExit()}>
                                            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                                            <div style={{display:"flex",alignItems:"center"}}>
                                                <img alt="" src="/images/scorecard/spreadsheets/table-icons/KPI.svg" style={{ marginRight: "4px" }} />
                                                {
                                                    edit.index === index && edit.ind === 0 ?
                                                        <TextField inputProps={{ inputMode: 'numeric' }} id="standard-basic" variant="standard" onBlur={() => handleExit()} onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                handleExit()
                                                            }
                                                        }
                                                        } defaultValue={kp.title} onChange={(e) => {
                                                            if (e.target.value !== "")
                                                                setKpi((prev) => ({ ...prev, title: e.target.value }))
                                                        }

                                                        } /> :
                                                        <span style={{ paddingLeft: "8px" }} onClick={() => setEdit((prev) => ({ ...prev, index: index, ind: 0 }))}>
                                                            {kp.title ? kp.title : kPI.title}
                                                        </span>
                                                }
                                                </div>
                                                <span className={kp.indicator_type === "leading" ? "indicators-icon-leading" : "indicators-icon-lagging"}>
                                                <img alt="" src={kp.indicator_type === "leading" ? "/images/scorecard/spreadsheets/table-icons/leading.svg" : "/images/scorecard/spreadsheets/sidebar/arrow-down-right.svg"} />
                                            </span>
                                            </div>
                                            </TableCell>
                                            <TableCell align="center">
                                              
                                                <img alt="" src="/images/scorecard/spreadsheets/table-icons/edit.svg" style={{ cursor: "pointer" }} onClick={() => setEditKPIShow(true)} />
                                            </TableCell>
                                            <TableCell align="center" sx={{ width:"10%"}}  onClick={() => setEdit((prev) => ({ ...prev, index: index, ind: 1 }))}>
                                                {
                                                    edit.index === index && edit.ind === 1 ?
                                                        <TextField inputProps={{ inputMode: 'numeric' }} size="small" id="standard-basic" variant="standard"
                                                            onBlur={() => handleExit()} onKeyDown={(e) => {
                                                                if (e.key === "Enter") {
                                                                    handleExit()
                                                                }
                                                            }
                                                            }
                                                            defaultValue={kp.measure}
                                                            onChange={(e) => {
                                                                if (e.target.value !== "")
                                                                    setKpi((prev) => ({ ...prev, measure: e.target.value }))
                                                            }
                                                            }
                                                        /> :
                                                        kp.measure
                                                }
                                            </TableCell>
                                            <TableCell align="center" sx={{ width:"10%"}}  onClick={() => setEdit((prev) => ({ ...prev, index: index, ind: 2 }))}>
                                                {
                                                    edit.index === index && edit.ind === 2 ?
                                                        <TextField inputProps={{ inputMode: 'numeric' }} size="small" id="standard-basic" variant="standard"
                                                            onBlur={() => handleExit()} onKeyDown={(e) => {
                                                                if (e.key === "Enter") {
                                                                    handleExit()
                                                                }
                                                            }
                                                            }
                                                            defaultValue={kp.value}
                                                            onChange={(e) => {
                                                                if (e.target.value !== "")
                                                                    setKpi((prev) => ({ ...prev, value: e.target.value }))
                                                            }

                                                            } /> :
                                                        kp.value
                                                }%</TableCell>
                                            <TableCell align="center" sx={{ width:"10%"}}  onClick={() => setEdit((prev) => ({ ...prev, index: index, ind: 3 }))}>
                                                {
                                                    edit.index === index && edit.ind === 3 ?
                                                        <TextField inputProps={{ inputMode: 'numeric' }} size="small" id="standard-basic" variant="standard"
                                                            onBlur={() => handleExit()} onKeyDown={(e) => {
                                                                if (e.key === "Enter") {
                                                                    handleExit()
                                                                }
                                                            }
                                                            }
                                                            defaultValue={kp.quant_weight}
                                                            onChange={(e) => {
                                                                if (e.target.value !== "")
                                                                    setKpi((prev) => ({ ...prev, quant_weight: e.target.value }))
                                                            }

                                                            } /> :
                                                        kp.quant_weight
                                                }
                                            </TableCell>
                                            <TableCell align="center" sx={{ width:"10%"}}  onClick={() => setEdit((prev) => ({ ...prev, index: index, ind: 4 }))}>
                                                {
                                                    edit.index === index && edit.ind === 4 ?
                                                        <TextField inputProps={{ inputMode: 'numeric' }} size="small" id="standard-basic" variant="standard"
                                                            onBlur={() => handleExit()} onKeyDown={(e) => {
                                                                if (e.key === "Enter") {
                                                                    handleExit()
                                                                }
                                                            }
                                                            }
                                                            defaultValue={kp.max}
                                                            onChange={(e) => {
                                                                if (e.target.value !== "")
                                                                    setKpi((prev) => ({ ...prev, max: e.target.value }))
                                                            }
                                                            }
                                                        /> :
                                                        kp.max
                                                }
                                            </TableCell>
                                            <TableCell align="center" sx={{ width:"10%"}}  onClick={() => setEdit((prev) => ({ ...prev, index: index, ind: 5 }))}>
                                                {
                                                    edit.index === index && edit.ind === 5 ?
                                                        <TextField inputProps={{ inputMode: 'numeric' }} size="small" id="standard-basic" variant="standard"
                                                            onBlur={() => handleExit()} onKeyDown={(e) => {
                                                                if (e.key === "Enter") {
                                                                    handleExit()
                                                                }
                                                            }
                                                            }
                                                            defaultValue={kp.min}
                                                            onChange={(e) => {
                                                                if (e.target.value !== "")
                                                                    setKpi((prev) => ({ ...prev, min: e.target.value }))
                                                            }
                                                            } /> :
                                                        kp.min
                                                }
                                            </TableCell>
                                            <TableCell align="center" sx={{ width:"10%"}}  onClick={() => setEdit((prev) => ({ ...prev, index: index, ind: 6 }))}>
                                                {
                                                    edit.index === index && edit.ind === 6 ?
                                                        <TextField inputProps={{ inputMode: 'numeric' }} size="small" id="standard-basic" variant="standard"
                                                            onBlur={() => handleExit()} onKeyDown={(e) => {
                                                                if (e.key === "Enter") {
                                                                    handleExit()
                                                                }
                                                            }
                                                            }
                                                            onChange={(e) => {
                                                                if (e.target.value !== "")
                                                                    setKpi((prev) => ({ ...prev, performance: e.target.value }))
                                                            }
                                                            }
                                                            defaultValue={kp?.performance}
                                                        /> :
                                                        `${Number.isInteger( kp?.performance)?Number( kp?.performance):Number(kp?.performance).toFixed(2)}`
                                                      
                                                }
                                            </TableCell>
                                        </>
                                }
                            
                  
                </TableRow>
            
            <EditKPI EditKPIShow={editKPIShow} handleEditKPIHide={handleEditKPIHide} />
        </>
    )
}

export default React.memo(KPI);