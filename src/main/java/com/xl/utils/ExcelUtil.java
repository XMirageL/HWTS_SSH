package com.xl.utils;

import com.xl.entity.THngyTeacherInfo;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicReference;

public class ExcelUtil {


    /**
     * 批量获取Excel文件中教师信息
     * @param tablePath 文件在服务器上的路径
     * @return 教师list
     */
    public static List<THngyTeacherInfo> getTeacherInfo(String tablePath){
        List<THngyTeacherInfo> list = new ArrayList<>();
        File file = new File(tablePath);
        try {
            InputStream is = new FileInputStream(file);
            jxl.Workbook wb = jxl.Workbook.getWorkbook(is);
            jxl.Sheet sheet = wb.getSheet(0);
            String tStr;
            //行
            for (int i = 0; i < sheet.getRows(); i++) {
                THngyTeacherInfo info = new THngyTeacherInfo();
                //列
                for (int j = 0; j < sheet.getColumns(); j++) {
                    tStr = sheet.getCell(j, i).getContents();
                    if (j == 0) {
                        info.setTeacherName(tStr);
                    } else if (j == 1) {
                        info.setStaffRoomId(Long.valueOf(tStr));
                    } else if (j == 2) {
                        info.setTeacherEmail(tStr);
                    } else if (j == 3) {
                        info.setTeacherPhone(tStr);
                    }
                }
                info.setTeacherPassword("123456");
                list.add(info);
            }
            is.close();
            wb.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;

    }

    /**
     * @param list        数据集合
     * @param keys        数据集合里map对象的key
     * @param columnNames 导出excel里面的列名
     * @return
     */
    public static Workbook createWorkbook(List<Map<String,Object>> list, String[] keys, String[] columnNames) {
        // 创建excel工作簿
        AtomicReference<XSSFWorkbook> wb = new AtomicReference<>(new XSSFWorkbook());
        // 创建第一个sheet（页），并命名
        XSSFSheet sheet = wb.get().createSheet();
        // 手动设置列宽。第一个参数表示要为第几列设；，第二个参数表示列的宽度，n为列高的像素数。
        for (int i = 0; i < keys.length; i++) {
            sheet.setColumnWidth((short) i, (short) (35.7 * 150));
        }

        // 创建第一行
        XSSFRow row = sheet.createRow((short) 0);

        // 创建两种单元格格式
        XSSFCellStyle cs = wb.get().createCellStyle();
        XSSFCellStyle cs2 = wb.get().createCellStyle();

        // 创建两种字体
        Font f = wb.get().createFont();
        Font f2 = wb.get().createFont();

        // 创建第一种字体样式（用于列名）
        f.setFontHeightInPoints((short) 10);
        f.setColor(IndexedColors.BLACK.getIndex());
        f.setBoldweight(Font.BOLDWEIGHT_BOLD);

        // 创建第二种字体样式（用于值）
        f2.setFontHeightInPoints((short) 10);
        f2.setColor(IndexedColors.BLACK.getIndex());

        // 设置第一种单元格的样式（用于列名）
        cs.setFont(f);
        cs.setBorderLeft(CellStyle.BORDER_THIN);
        cs.setBorderRight(CellStyle.BORDER_THIN);
        cs.setBorderTop(CellStyle.BORDER_THIN);
        cs.setBorderBottom(CellStyle.BORDER_THIN);
        cs.setAlignment(CellStyle.ALIGN_CENTER);

        // 设置第二种单元格的样式（用于值）
        cs2.setFont(f2);
        cs2.setBorderLeft(CellStyle.BORDER_THIN);
        cs2.setBorderRight(CellStyle.BORDER_THIN);
        cs2.setBorderTop(CellStyle.BORDER_THIN);
        cs2.setBorderBottom(CellStyle.BORDER_THIN);
        cs2.setAlignment(CellStyle.ALIGN_CENTER);

        //设置列名
        for (int i = 0; i < columnNames.length; i++) {
            XSSFCell cell = row.createCell(i);
            cell.setCellValue(columnNames[i]);
            cell.setCellStyle(cs);
        }
        //设置每行每列的值
        for (short i = 0; i < list.size(); i++) {
            // Row 行,Cell 方格 , Row 和 Cell 都是从0开始计数的
            // 创建一行，在页sheet上
            XSSFRow row1 = sheet.createRow((short) i + 1);
            // 在row行上创建一个方格
            for (short j = 0; j < keys.length; j++) {
                XSSFCell cell = row1.createCell(j);
                cell.setCellValue(list.get(i).get(keys[j]) == null ? " " : list.get(i).get(keys[j]).toString());
                cell.setCellStyle(cs2);
            }
        }
        return wb.get();
    }

}
