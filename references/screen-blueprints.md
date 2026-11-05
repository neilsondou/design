# Dou Design — Mei Can Screen Blueprints

These blueprints preserve the reference product's UI composition in framework-neutral terms. They describe visible content, hierarchy, states, and interaction intent; they do not prescribe how to implement them. Keep the original Simplified Chinese labels and source behavior when reproducing this product. For a different product, retain the visual grammar and replace product content with accurate requirements.

## Shared shell

- Four primary destinations: 今天, 记录, 趋势, 我的.
- Main page inset 24 px; top content begins 14–18 px after the safe area.
- Large page title and a trailing contextual icon action where relevant.
- Floating capsule navigation: 66 px high, 6 px inner padding, 296–420 px wide, 14 px side inset, four evenly spaced items. Use an inset selected pill and a quiet opaque treatment when blur is unavailable.
- Reserve about 144 px after scrollable content for the floating navigation and safe area.
- Secondary screens use a 14 px back inset and retain the same page typography and surfaces.

## 1. Today — dashboard

### Default composition

1. Date eyebrow and title **今天**, with camera action.
2. Emphasized calorie summary card. Show “今天已经吃了”, a status tag, a 68 px tabular calorie value and smaller “大卡” unit, short interpretation, 6 px progress track, target/remaining labels, and three compact metabolic facts.
3. Paired actions: **记一餐** as primary and **拍照识别** as secondary.
4. Section **今天吃了什么** with a history action when records exist. Show grouped meal rows or an empty state with **还没有开动** and a “记一餐” action.
5. Goal progress card with clipped upper-right ring. Show **目标进程**, an arrival/forecast state, supporting explanation, current/target values, and a trend affordance.
6. Quiet **热量换算** entry card.

Section gaps are 42 px; title to first card is about 30 px. Emphasized card padding is 26 px. Calorie progress is clamped visually to the track but the percentage reflects the actual ratio. Over-target content uses warm/warning semantics.

### Meal row

Use a 44 px semantic meal badge, meal name, time/source, food preview, trailing tabular calories, and optional chevron. Preview up to three items; otherwise use “前三项 等 N 种”. A meal without details says “没有食物明细”. Tapping opens a detail sheet with item amounts, note, edit, and confirmed delete actions.

### States

- No meals: explicit, friendly empty state and add action.
- Normal intake: sage progress and a remaining amount.
- Over target: warm-to-warning progress and an excess amount; use neutral language.
- Goal met, forecast available, or insufficient history: distinct goal-card copy; do not fabricate a prediction.

## 2. Records — calendar and meal editor

### Record day

1. Header **记录**, eyebrow **回看每一天**, calendar action.
2. Weekly calendar card with month, previous/next controls, seven day cells, selected date, and a separate dot for today. Disable future dates. Day cells are 64 px high with 18 px corners.
3. Daily summary card with **这一天吃了**, meal-count tag, 44 px calorie value, interpretation, 6 px progress, target and remaining/excess line.
4. Paired **记一餐** and **拍照识别** actions.
5. Section **今天吃了什么** for today or **这一天吃了什么** for another date. Show grouped meal rows or a date-aware empty state.
6. Quiet hint: “轻点某一餐，可以查看、编辑或删除。”

### Meal editor

- Back control, date eyebrow, title **记一餐** or **编辑这一餐**.
- **哪一餐** label and segmented choices: 早餐 / 午餐 / 晚餐 / 加餐.
- **这一餐的食物** section; grouped rows or empty state **还没放食物**.
- Food row: name, grams and “轻点修改”, trailing calories and remove affordance.
- Paired actions **食物库** and **手动添加**; note field hint “想记点什么？例如：米饭半碗、少油。”
- Fixed save dock shows item count and total calories above **保存这一餐** or **保存修改**.

### Food library and manual entry

Food library: **食物库**, item count, search hint “搜索食物，例如：米饭”, category chips (全部 / 主食 / 快餐 / 肉蛋 / 蔬果 / 豆乳 / 零食 / 饮品), and grouped result rows with category/default amount, calories, and add action. No results: **没有找到** with a manual-entry suggestion.

Manual entry: **手动添加**, food name, paired grams and total-calorie fields, explanatory copy, and **加入这一餐**. Validate name, positive amount, and calories without erasing entered data.

Amount adjustment sheet: item name, brief explanation that calories update proportionally, amount and total-calorie fields, and **完成**.

## 3. Trends — body and goals

1. Eyebrow **身体与目标**, title **趋势**, add-weight action.
2. Current-weight card: latest value/unit, target tag, difference or in-range status. If there is insufficient history, show a clear prompt to add measurements; otherwise show weight chart and goal reference.
3. Goal forecast card with the same clipped ring motif and a method note.
4. Body-fat estimate card with category tag, percentage, fat/lean estimate, warm trend, and visible estimate caveat.
5. AI advice card with loading, result, unavailable, and error states; keep it secondary and provide a concise context/privacy note.
6. Seven-day intake card with mean value, logged-day count, chart, expenditure reference, summary, and a footnote explaining which days are included.
7. Body facts card: BMR/TDEE explanation and three aligned facts (height, age, sex).
8. Recent weight records in a grouped list with edit affordance, confirmed delete, and a short gesture hint.

Weight entry sheet includes date, large numeric field with current display unit, measurement guidance, and save/overwrite state. Same-day replacement requires explicit confirmation. A historical entry must not silently alter the current value.

## 4. My — settings

1. Header eyebrow **自己与设备**, title **我的**.
2. Body-and-goal card: profile icon, **身体与目标**, edit hint, current/target values, BMR/TDEE explanation, and three compact facts.
3. **显示与输入** section with separate grouped preference cards:
   - **外观** with the helper “暗色更沉稳，亮色是带一点米色的暖白” and 暗色/亮色 segmented control.
   - **体重单位** with the helper “切换后全局显示与输入都会换算，1 公斤 = 2 市斤” and 公斤/市斤 segmented control.
   - Quiet note that stored data is unchanged and only displayed values convert.
4. **同步** grouped row with cloud icon and account/sync status.
5. **导出** grouped actions for CSV and printable PDF.
6. Small centered footer: **Mei Can**, **by 老窦**.

Profile sheet includes paired height/current weight, age/target weight, biological-sex segment, activity chips, BMR/TDEE preview, and save action. Sync sheet has login and authenticated variants, visible errors, current status, last-sync time, optional recent logs, manual sync, and confirmed sign-out. Keep credentials private and errors specific.

## 5. Photo food recognition

### Before selection

Back action, **拍照识别**, concise explanation, and an emphasized camera card with a 54 px camera badge, **拍下这一餐**, short description, **拍照** and **从相册选择** actions. Show service availability in a quiet note. A separate **识别之后** card explains the editable result.

### After selection

Show a 230 px rounded photo preview with overlay labels **已选照片** and **更换**. Then one of:

- Analyzing card with clear busy status and expected wait.
- Empty result: **这一张没有结果**, practical retake advice, and capture/gallery actions.
- Result: optional concise **识别说明**, editable grouped food rows, item count and total, meal-type selector, and **和ai犟嘴（我没吃这么多）** refinement action.

The fixed result dock contains a concise adjustment field (hint: “微调，例如：米饭只有半碗”) and **保存**. Refinement sheet includes current item/calorie summary, multiline instructions, suggestion chips, and **让 AI 重新算**. Keep output editable and make model limitations clear. Never imply that estimates are exact.

## 6. Calorie converter

Header eyebrow **对着营养成分表**, title **热量换算**, and explanation. Segmented modes: **千焦转大卡** / **整包热量**. Use labeled inputs and optional presets **500 千焦 / 1000 千焦 / 2000 千焦**. Whole-package mode has per-serving energy, serving amount, and package net amount.

Result card uses the clipped ring motif, **约合** or **整包约**, a 54 px tabular value and smaller **大卡** unit, and a small formula detail. Footnote: “国内营养成分表通常使用千焦。换算只改变单位，不代表食物本身的热量。” The conversion is kcal = kJ / 4.184; whole package = energy / 4.184 × package amount / serving amount.

## 7. Import weight from screenshot

Bottom sheet title states **从截图导入体重**, then **核对体重记录** after parsing. Explain accepted sources and make clear that only weight entries are read. The user explicitly selects each row before import.

- Before selection: camera/gallery actions and a privacy note that the image is used for recognition and is not stored in cloud sync.
- After selection: 132 px preview, analyzing state, unit selector, concise recognition text, and parsed row list.
- Each row has checkbox, localized date, value and unit, and an explicit same-day overwrite indicator.
- Provide select all/cancel all and a clear import action. Invalid converted values block import with a specific explanation.
- If dates conflict, state how many records will be overwritten and ask for confirmation before proceeding.
- Success toast: **已导入 N 条体重记录**. Empty result: **这张截图里没有找到可用的体重记录。换一张日期和数值更清楚的截图试试。**

## Shared copy, data, and state rules

- Dates and measurements are data-driven. Preserve the Chinese date formats and punctuation from product content.
- Weight display supports 公斤 and 市斤; 1 公斤 = 2 市斤. Keep stored values consistent when changing display unit.
- Calories are rounded for display; keep units adjacent to values.
- Formulas and estimates must be described as estimates. Show caveats where the estimate is presented.
- Do not invent history, AI results, account status, or chart values.
- Use calm, factual copy. Avoid blame, body judgment, and food moralizing.
- Keep loading, empty, error, no-service, saved, and conflict states distinct and visually stable.
