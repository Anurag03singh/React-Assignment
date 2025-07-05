import { Search, Bell, Filter, Eye, Download, Upload, Share, Plus, ChevronDown, Grid3X3, Eye as EyeIcon, SortAsc, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge } from "./StatusBadge";
import { PriorityBadge } from "./PriorityBadge";
import React, { useState, useRef, useEffect } from "react";

export function Spreadsheet() {
  // Add state for bottom tabs
  const [activeTab, setActiveTab] = useState("All Orders");
  // Add refs for keyboard navigation
  const rowRefs = useRef<(HTMLTableRowElement | null)[]>([]);
  const cellRefs = useRef<(HTMLTableCellElement | null)[][]>([]);
  
  // Selection state
  const [selectedCell, setSelectedCell] = useState<{row: number, col: number} | null>(null);
  const [clipboard, setClipboard] = useState<string>("");
  
  // Search and filter state
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredRows, setFilteredRows] = useState<number[]>([]);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  
  // Cell data state for export
  const [cellData, setCellData] = useState<string[][]>(Array.from({ length: 20 }, () => Array(10).fill("")));
  
  // Initialize cell refs
  useEffect(() => {
    cellRefs.current = Array.from({ length: 20 }, () => 
      Array.from({ length: 10 }, () => null)
    );
  }, []);

  // Handle search functionality
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim() === "") {
      setFilteredRows([]);
      setIsFiltered(false);
      return;
    }
    
    const filtered: number[] = [];
    cellData.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell.toLowerCase().includes(term.toLowerCase())) {
          if (!filtered.includes(rowIndex)) {
            filtered.push(rowIndex);
          }
        }
      });
    });
    
    setFilteredRows(filtered);
    setIsFiltered(true);
    console.log(`Search results: ${filtered.length} rows found for "${term}"`);
  };

  // Handle cell data changes
  const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
    const newData = [...cellData];
    newData[rowIndex][colIndex] = value;
    setCellData(newData);
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['#', 'Job Request', 'Submitted', 'Status', 'Submitter', 'URL', 'Assigned', 'Priority', 'Due Date', 'Est. Value'];
    const csvContent = [
      headers.join(','),
      ...cellData.map((row, index) => 
        [index + 1, ...row].join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'spreadsheet-data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    console.log('CSV exported successfully');
  };

  // Print functionality
  const printSpreadsheet = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const headers = ['#', 'Job Request', 'Submitted', 'Status', 'Submitter', 'URL', 'Assigned', 'Priority', 'Due Date', 'Est. Value'];
      
      const printContent = `
        <html>
          <head>
            <title>Spreadsheet Print</title>
            <style>
              table { border-collapse: collapse; width: 100%; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
            </style>
          </head>
          <body>
            <h2>Spreadsheet Data</h2>
            <table>
              <thead>
                <tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>
              </thead>
              <tbody>
                ${cellData.map((row, index) => 
                  `<tr><td>${index + 1}</td>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`
                ).join('')}
              </tbody>
            </table>
          </body>
        </html>
      `;
      
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
      console.log('Print window opened');
    }
  };

  // Enhanced copy functionality
  const copyCellContent = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setClipboard(content);
      console.log('Copied to clipboard:', content);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = content;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setClipboard(content);
      console.log('Copied to clipboard (fallback):', content);
    }
  };

  // Enhanced paste functionality
  const pasteToCell = (rowIndex: number, colIndex: number) => {
    if (clipboard) {
      const newData = [...cellData];
      newData[rowIndex][colIndex] = clipboard;
      setCellData(newData);
      console.log('Pasted to cell:', clipboard);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, rowIndex: number, colIndex: number) => {
    e.preventDefault();
    
    switch (e.key) {
      case 'ArrowDown':
        if (rowIndex < 19) {
          const nextCell = cellRefs.current[rowIndex + 1]?.[colIndex];
          if (nextCell) {
            nextCell.focus();
            setSelectedCell({ row: rowIndex + 1, col: colIndex });
          }
        }
        break;
      case 'ArrowUp':
        if (rowIndex > 0) {
          const prevCell = cellRefs.current[rowIndex - 1]?.[colIndex];
          if (prevCell) {
            prevCell.focus();
            setSelectedCell({ row: rowIndex - 1, col: colIndex });
          }
        }
        break;
      case 'ArrowLeft':
        if (colIndex > 0) {
          const leftCell = cellRefs.current[rowIndex]?.[colIndex - 1];
          if (leftCell) {
            leftCell.focus();
            setSelectedCell({ row: rowIndex, col: colIndex - 1 });
          }
        }
        break;
      case 'ArrowRight':
        if (colIndex < 9) {
          const rightCell = cellRefs.current[rowIndex]?.[colIndex + 1];
          if (rightCell) {
            rightCell.focus();
            setSelectedCell({ row: rowIndex, col: colIndex + 1 });
          }
        }
        break;
      case 'Tab':
        if (e.shiftKey) {
          // Shift+Tab: move left
          if (colIndex > 0) {
            const leftCell = cellRefs.current[rowIndex]?.[colIndex - 1];
            if (leftCell) {
              leftCell.focus();
              setSelectedCell({ row: rowIndex, col: colIndex - 1 });
            }
          } else if (rowIndex > 0) {
            const lastCell = cellRefs.current[rowIndex - 1]?.[9];
            if (lastCell) {
              lastCell.focus();
              setSelectedCell({ row: rowIndex - 1, col: 9 });
            }
          }
        } else {
          // Tab: move right
          if (colIndex < 9) {
            const rightCell = cellRefs.current[rowIndex]?.[colIndex + 1];
            if (rightCell) {
              rightCell.focus();
              setSelectedCell({ row: rowIndex, col: colIndex + 1 });
            }
          } else if (rowIndex < 19) {
            const firstCell = cellRefs.current[rowIndex + 1]?.[0];
            if (firstCell) {
              firstCell.focus();
              setSelectedCell({ row: rowIndex + 1, col: 0 });
            }
          }
        }
        break;
      case 'Enter':
        if (e.shiftKey) {
          // Shift+Enter: move up
          if (rowIndex > 0) {
            const upCell = cellRefs.current[rowIndex - 1]?.[colIndex];
            if (upCell) {
              upCell.focus();
              setSelectedCell({ row: rowIndex - 1, col: colIndex });
            }
          }
        } else {
          // Enter: move down
          if (rowIndex < 19) {
            const downCell = cellRefs.current[rowIndex + 1]?.[colIndex];
            if (downCell) {
              downCell.focus();
              setSelectedCell({ row: rowIndex + 1, col: colIndex });
            }
          }
        }
        break;
      case 'c':
        if (e.ctrlKey || e.metaKey) {
          // Copy
          const cellContent = e.currentTarget.textContent || "";
          copyCellContent(cellContent);
        }
        break;
      case 'v':
        if (e.ctrlKey || e.metaKey) {
          // Paste
          pasteToCell(rowIndex, colIndex);
        }
        break;
    }
  };

  // Handle cell click for selection
  const handleCellClick = (rowIndex: number, colIndex: number) => {
    setSelectedCell({ row: rowIndex, col: colIndex });
  };

  // Handle right-click for context menu
  const handleContextMenu = (e: React.MouseEvent, rowIndex: number, colIndex: number) => {
    e.preventDefault();
    setSelectedCell({ row: rowIndex, col: colIndex });
    
    // Copy to clipboard on right-click
    const cellContent = e.currentTarget.textContent || "";
    copyCellContent(cellContent);
  };

  // Handle cell content change
  const handleCellInput = (e: React.FormEvent<HTMLTableCellElement>, rowIndex: number, colIndex: number) => {
    const content = e.currentTarget.textContent || "";
    handleCellChange(rowIndex, colIndex, content);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-header-border bg-header px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Grid3X3 className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Spreadsheet</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search within sheet" 
                className="w-64 pl-9 h-8 text-sm"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-destructive rounded-full"></span>
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">JD</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <div className="font-medium">John Doe</div>
              <div className="text-xs text-muted-foreground">john.doe...</div>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="border-b border-border bg-toolbar px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-xs" onClick={() => console.log("Toolbar: Tool bar clicked")}> 
              <Settings className="mr-1 h-3 w-3" />
              Tool bar
              <ChevronDown className="ml-1 h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" className="text-xs" onClick={() => console.log("Toolbar: Hide fields clicked")}> 
              <EyeIcon className="mr-1 h-3 w-3" />
              Hide fields
            </Button>
            <Button variant="ghost" size="sm" className="text-xs" onClick={() => console.log("Toolbar: Sort clicked")}> 
              <SortAsc className="mr-1 h-3 w-3" />
              Sort
            </Button>
            <Button variant="ghost" size="sm" className="text-xs" onClick={() => console.log("Toolbar: Filter clicked")}> 
              <Filter className="mr-1 h-3 w-3" />
              Filter
            </Button>
            <Button variant="ghost" size="sm" className="text-xs" onClick={() => console.log("Toolbar: Cell view clicked")}> 
              <Eye className="mr-1 h-3 w-3" />
              Cell view
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-xs" onClick={() => console.log("Toolbar: Import clicked")}> 
              <Download className="mr-1 h-3 w-3" />
              Import
            </Button>
            <Button variant="ghost" size="sm" className="text-xs" onClick={exportToCSV}> 
              <Upload className="mr-1 h-3 w-3" />
              Export
            </Button>
            <Button variant="ghost" size="sm" className="text-xs" onClick={printSpreadsheet}> 
              <Share className="mr-1 h-3 w-3" />
              Print
            </Button>
            <Button size="sm" className="text-xs bg-primary text-primary-foreground" onClick={() => console.log("Toolbar: New Action clicked")}> 
              <Plus className="mr-1 h-3 w-3" />
              New Action
            </Button>
          </div>
        </div>
      </div>

      {/* Search Results Indicator */}
      {isFiltered && (
        <div className="bg-blue-50 border-b border-blue-200 px-4 py-2">
          <div className="text-sm text-blue-800">
            Showing {filteredRows.length} of 20 rows matching "{searchTerm}"
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-2 text-xs"
              onClick={() => {
                setSearchTerm("");
                setFilteredRows([]);
                setIsFiltered(false);
              }}
            >
              Clear
            </Button>
          </div>
        </div>
      )}

      {/* Spreadsheet Grid */}
      <div className="overflow-auto">
        <table className="w-full border-collapse">
          <thead className="bg-muted/50 border-b border-border sticky top-0">
            {/* First row with badges */}
            <tr>
              <th className="px-4 py-1 text-left w-8 border-r border-border"></th>
              <th className="px-4 py-1 text-left min-w-64 border-r border-border">
                <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs px-2 py-1 font-medium">
                  Q3 Financial Overview
                </Badge>
              </th>
              <th className="px-4 py-1 text-left min-w-24 border-r border-border"></th>
              <th className="px-4 py-1 text-left min-w-24 border-r border-border"></th>
              <th className="px-4 py-1 text-left min-w-32 border-r border-border"></th>
              <th className="px-4 py-1 text-left min-w-32 border-r border-border"></th>
              <th className="px-4 py-1 text-left min-w-32 border-r border-border">
                <Badge className="bg-special-abc text-special-abc-foreground text-xs px-2 py-1">
                  ABC
                </Badge>
              </th>
              <th className="px-4 py-1 text-left min-w-20 border-r border-border" colSpan={2}>
                <Badge className="bg-special-question text-special-question-foreground text-xs px-2 py-1">
                  Answer a question
                </Badge>
              </th>
              <th className="px-4 py-1 text-left min-w-24">
                <Badge className="bg-special-extract text-special-extract-foreground text-xs px-2 py-1">
                  Extract
                </Badge>
              </th>
            </tr>
            {/* Second row with column headers */}
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground w-8 border-r border-border">#</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground min-w-64 border-r border-border">Job Request</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground min-w-24 border-r border-border">Submitted</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground min-w-24 border-r border-border">Status</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground min-w-32 border-r border-border">Submitter</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground min-w-32 border-r border-border">URL</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground min-w-32 border-r border-border">Assigned</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground min-w-20 border-r border-border">Priority</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground min-w-24 border-r border-border">Due Date</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground min-w-24">Est. Value</th>
            </tr>
          </thead>
          <tbody>
            {/* Empty rows for the grid */}
            {Array.from({ length: 20 }, (_, i) => {
              const isRowVisible = !isFiltered || filteredRows.includes(i);
              return (
                <tr
                  key={`row-${i}`}
                  className={`border-b border-border hover:bg-muted/20 ${!isRowVisible ? 'hidden' : ''}`}
                  ref={el => rowRefs.current[i] = el}
                >
                  <td 
                    className={`px-4 py-3 text-sm text-muted-foreground border-r border-border cursor-pointer outline-none ${
                      selectedCell?.row === i && selectedCell?.col === 0 ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                    }`}
                    tabIndex={0}
                    ref={(el) => {
                      if (!cellRefs.current[i]) cellRefs.current[i] = [];
                      cellRefs.current[i][0] = el;
                    }}
                    onKeyDown={(e) => handleKeyDown(e, i, 0)}
                    onClick={() => handleCellClick(i, 0)}
                    onContextMenu={(e) => handleContextMenu(e, i, 0)}
                    onInput={(e) => handleCellInput(e, i, 0)}
                    contentEditable
                    suppressContentEditableWarning
                  >
                    {i + 1}
                  </td>
                  <td 
                    className={`px-4 py-3 text-sm border-r border-border cursor-pointer outline-none ${
                      selectedCell?.row === i && selectedCell?.col === 1 ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                    }`}
                    tabIndex={0}
                    ref={(el) => {
                      if (!cellRefs.current[i]) cellRefs.current[i] = [];
                      cellRefs.current[i][1] = el;
                    }}
                    onKeyDown={(e) => handleKeyDown(e, i, 1)}
                    onClick={() => handleCellClick(i, 1)}
                    onContextMenu={(e) => handleContextMenu(e, i, 1)}
                    onInput={(e) => handleCellInput(e, i, 1)}
                    contentEditable
                    suppressContentEditableWarning
                  >{cellData[i][1]}</td>
                  <td 
                    className={`px-4 py-3 text-sm border-r border-border cursor-pointer outline-none ${
                      selectedCell?.row === i && selectedCell?.col === 2 ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                    }`}
                    tabIndex={0}
                    ref={(el) => {
                      if (!cellRefs.current[i]) cellRefs.current[i] = [];
                      cellRefs.current[i][2] = el;
                    }}
                    onKeyDown={(e) => handleKeyDown(e, i, 2)}
                    onClick={() => handleCellClick(i, 2)}
                    onContextMenu={(e) => handleContextMenu(e, i, 2)}
                    onInput={(e) => handleCellInput(e, i, 2)}
                    contentEditable
                    suppressContentEditableWarning
                  >{cellData[i][2]}</td>
                  <td 
                    className={`px-4 py-3 text-sm border-r border-border cursor-pointer outline-none ${
                      selectedCell?.row === i && selectedCell?.col === 3 ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                    }`}
                    tabIndex={0}
                    ref={(el) => {
                      if (!cellRefs.current[i]) cellRefs.current[i] = [];
                      cellRefs.current[i][3] = el;
                    }}
                    onKeyDown={(e) => handleKeyDown(e, i, 3)}
                    onClick={() => handleCellClick(i, 3)}
                    onContextMenu={(e) => handleContextMenu(e, i, 3)}
                    onInput={(e) => handleCellInput(e, i, 3)}
                    contentEditable
                    suppressContentEditableWarning
                  >{cellData[i][3]}</td>
                  <td 
                    className={`px-4 py-3 text-sm border-r border-border cursor-pointer outline-none ${
                      selectedCell?.row === i && selectedCell?.col === 4 ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                    }`}
                    tabIndex={0}
                    ref={(el) => {
                      if (!cellRefs.current[i]) cellRefs.current[i] = [];
                      cellRefs.current[i][4] = el;
                    }}
                    onKeyDown={(e) => handleKeyDown(e, i, 4)}
                    onClick={() => handleCellClick(i, 4)}
                    onContextMenu={(e) => handleContextMenu(e, i, 4)}
                    onInput={(e) => handleCellInput(e, i, 4)}
                    contentEditable
                    suppressContentEditableWarning
                  >{cellData[i][4]}</td>
                  <td 
                    className={`px-4 py-3 text-sm border-r border-border cursor-pointer outline-none ${
                      selectedCell?.row === i && selectedCell?.col === 5 ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                    }`}
                    tabIndex={0}
                    ref={(el) => {
                      if (!cellRefs.current[i]) cellRefs.current[i] = [];
                      cellRefs.current[i][5] = el;
                    }}
                    onKeyDown={(e) => handleKeyDown(e, i, 5)}
                    onClick={() => handleCellClick(i, 5)}
                    onContextMenu={(e) => handleContextMenu(e, i, 5)}
                    onInput={(e) => handleCellInput(e, i, 5)}
                    contentEditable
                    suppressContentEditableWarning
                  >{cellData[i][5]}</td>
                  <td 
                    className={`px-4 py-3 text-sm border-r border-border cursor-pointer outline-none ${
                      selectedCell?.row === i && selectedCell?.col === 6 ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                    }`}
                    tabIndex={0}
                    ref={(el) => {
                      if (!cellRefs.current[i]) cellRefs.current[i] = [];
                      cellRefs.current[i][6] = el;
                    }}
                    onKeyDown={(e) => handleKeyDown(e, i, 6)}
                    onClick={() => handleCellClick(i, 6)}
                    onContextMenu={(e) => handleContextMenu(e, i, 6)}
                    onInput={(e) => handleCellInput(e, i, 6)}
                    contentEditable
                    suppressContentEditableWarning
                  >{cellData[i][6]}</td>
                  <td 
                    className={`px-4 py-3 text-sm border-r border-border cursor-pointer outline-none ${
                      selectedCell?.row === i && selectedCell?.col === 7 ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                    }`}
                    tabIndex={0}
                    ref={(el) => {
                      if (!cellRefs.current[i]) cellRefs.current[i] = [];
                      cellRefs.current[i][7] = el;
                    }}
                    onKeyDown={(e) => handleKeyDown(e, i, 7)}
                    onClick={() => handleCellClick(i, 7)}
                    onContextMenu={(e) => handleContextMenu(e, i, 7)}
                    onInput={(e) => handleCellInput(e, i, 7)}
                    contentEditable
                    suppressContentEditableWarning
                  >{cellData[i][7]}</td>
                  <td 
                    className={`px-4 py-3 text-sm border-r border-border cursor-pointer outline-none ${
                      selectedCell?.row === i && selectedCell?.col === 8 ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                    }`}
                    tabIndex={0}
                    ref={(el) => {
                      if (!cellRefs.current[i]) cellRefs.current[i] = [];
                      cellRefs.current[i][8] = el;
                    }}
                    onKeyDown={(e) => handleKeyDown(e, i, 8)}
                    onClick={() => handleCellClick(i, 8)}
                    onContextMenu={(e) => handleContextMenu(e, i, 8)}
                    onInput={(e) => handleCellInput(e, i, 8)}
                    contentEditable
                    suppressContentEditableWarning
                  >{cellData[i][8]}</td>
                  <td 
                    className={`px-4 py-3 text-sm cursor-pointer outline-none ${
                      selectedCell?.row === i && selectedCell?.col === 9 ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                    }`}
                    tabIndex={0}
                    ref={(el) => {
                      if (!cellRefs.current[i]) cellRefs.current[i] = [];
                      cellRefs.current[i][9] = el;
                    }}
                    onKeyDown={(e) => handleKeyDown(e, i, 9)}
                    onClick={() => handleCellClick(i, 9)}
                    onContextMenu={(e) => handleContextMenu(e, i, 9)}
                    onInput={(e) => handleCellInput(e, i, 9)}
                    contentEditable
                    suppressContentEditableWarning
                  >{cellData[i][9]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Bottom Tabs */}
      <div className="border-t border-border bg-background px-4 py-2 mt-auto">
        <div className="flex items-center space-x-1">
          <Button 
            variant="ghost" 
            size="sm" 
            className={`text-xs font-medium ${activeTab === "All Orders" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            onClick={() => { setActiveTab("All Orders"); console.log("Tab: All Orders clicked"); }}
          >
            All Orders
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={`text-xs ${activeTab === "Pending" ? "bg-muted text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
            onClick={() => { setActiveTab("Pending"); console.log("Tab: Pending clicked"); }}
          >
            Pending
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={`text-xs ${activeTab === "Reviewed" ? "bg-muted text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
            onClick={() => { setActiveTab("Reviewed"); console.log("Tab: Reviewed clicked"); }}
          >
            Reviewed
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={`text-xs ${activeTab === "Arrived" ? "bg-muted text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
            onClick={() => { setActiveTab("Arrived"); console.log("Tab: Arrived clicked"); }}
          >
            Arrived
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs"
            onClick={() => console.log("Tab: Plus clicked")}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}