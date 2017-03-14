/*
MCPE Utils
version 5.0
© 2016-2017 Dark Tornado, All rights reserved.
*/


const ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
const sdcard = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();

const white = android.graphics.Color.WHITE;
const black = android.graphics.Color.BLACK;
const yellow = android.graphics.Color.YELLOW;
const toast = ModPE.showTipMessage;
const number = android.text.InputType.TYPE_CLASS_NUMBER;
const number2 = android.text.InputType.TYPE_NUMBER_FLAG_SIGNED;
const number3 = android.text.InputType.TYPE_NUMBER_FLAG_DECIMAL;
const version = "5.0";
var version2 = "N/A";
const version3 = "2.0";

var btn = null;
var notFull = false;
var signEdit = false;
var useCmd = false;
var hideNameTag = false;
var homeData = [];
var useResImage = true;
var useNewGui = false;
var timeLock = false;
var timeLockData = null;
var invSave = false;
var invenSaveData = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
var armorSave = false;
var armorSaveData = [[], [], [], []];
var isDied = false;
var anti = 0;
var posWindow = null;
var posText = null;
var isAlerted = true;
var btnE = null;
var spawnMode = false;
var spawnData = null;
var healthLock = false;
var healthLockData = null;
var hungerLock = false;
var hungerLockData = null;
var antiEnt = false;
var showHealth = false;
var rideEnt = false;
var tick = 0;
var lightningReinforce = false;
var wWin = null;
var w = {input : 0, x : [], y : [], z : [], b : [], bd : [], xx : 0, yy : 0, zz : 0, f : false, c : false};
var posRight = false;

const Util = {
    makeMainText: function() {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    btn = new android.widget.PopupWindow(ctx);
                    var txt = new mcpelib.gui.TextView(ctx);
                    txt.setText("Utils");
                    txt.setTextSize(17);
                    txt.setOnClickListener(new android.view.View.OnClickListener({
                        onClick: function(v) {
                            if (isAlerted) {
                                Util.openSettings();
                            } else {
                                Util.updateDialog();
                                isAlerted = true;
                            }
                        }
                    }));
                    var longTouchCheck = false;
                    txt.setOnLongClickListener(new android.view.View.OnLongClickListener({
                        onLongClick: function(v) {
                            longTouchCheck = true;
                            return true;
                        }
                    }));
                    txt.setOnTouchListener(new android.view.View.OnTouchListener({
                        onTouch: function(v, ev) {
                            try {
                                if (longTouchCheck) {
                                    switch (ev.action) {
                                        case android.view.MotionEvent.ACTION_MOVE:
                                            btn.update(ctx.getWindowManager().getDefaultDisplay().getWidth() - ev.getRawX() - dip2px(ctx, 20), ev.getRawY(), btn.getWidth(), btn.getHeight());
                                            break;
                                        case android.view.MotionEvent.ACTION_UP:
                                            longTouchCheck = false;
                                            break;
                                    }
                                }
                                return false;
                            } catch (e) {
                                clientMessage(e + ", " + e.lineNumber);
                            }
                        }
                    }));
                    var pad = dip2px(ctx, 5);
                    txt.setPadding(pad, pad, pad, pad);
                    btn.setContentView(txt);
                    btn.setWidth(-2);
                    btn.setHeight(-2);
                    btn.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                    btn.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, dip2px(ctx, 90), dip2px(ctx, 5));
                } catch (e) {
                    clientMessage(e + ", " + e.lineNumber);
                }
            }
        }));
    },
    openSettings: function() {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    var window = new mcpelib.window.Window(ctx, useNewGui);
                    window.setTitle("MCPE   Utils");
                    var layout = new android.widget.LinearLayout(ctx);
                    layout.setOrientation(1);
                    layout.setGravity(android.view.Gravity.CENTER);
                    var mar = dip2px(ctx, 5);
                    var pad = dip2px(ctx, 5);
                    var margin = new android.view.ViewGroup.MarginLayoutParams(-1, -2);
                    margin.setMargins(dip2px(ctx, 2), mar, mar, mar);
                    var lParams = new android.widget.LinearLayout.LayoutParams(dip2px(ctx, 145), -2, 1);
                    lParams.setMargins(mar, mar, mar, mar);
                    var rParams = new android.widget.LinearLayout.LayoutParams(-1, -2, 3);
                    lParams.setMargins(mar, mar, mar, mar);
                    var layout2 = new android.widget.LinearLayout(ctx);
                    layout2.setOrientation(0);
                    layout2.setWeightSum(4);
                    var layoutL = new android.widget.LinearLayout(ctx);
                    layoutL.setOrientation(1);
                    layoutL.setGravity(android.view.Gravity.CENTER);
                    var layoutR = new android.widget.LinearLayout(ctx);
                    layoutR.setOrientation(1);
                    layoutR.setGravity(android.view.Gravity.CENTER);
                    var lays = [];
                    lays[0] = UtilLayout.invenLayout();
                    lays[1] = UtilLayout.worldLayout();
                    lays[2] = UtilLayout.entityLayout();
                    lays[3] = UtilLayout.elseLayout();
                    var btns = [];
                    var menus = ["Inv.", "World", "Ent.", "Else"];
                    for (var n in menus) {
                        btns[n] = new mcpelib.gui.Button(ctx, useNewGui);
                        btns[n].setText(menus[n]);
                        btns[n].setId(n);
                        btns[n].setLayoutParams(new android.widget.LinearLayout.LayoutParams(margin));
                        btns[n].setOnClickListener(new android.view.View.OnClickListener({
                            onClick: function(v) {
                                try {
                                    layoutR.removeViewAt(0);
                                    layoutR.addView(lays[v.getId()], 0);
                                } catch (e) {
                                    showDialog("Error", e + "\n" + e.lineNumber);
                                }
                            }
                        }));
                        layoutL.addView(btns[n]);
                    }
                    layoutL.setPadding(pad, pad, pad, pad);
                    var scrollL = new android.widget.ScrollView(ctx);
                    scrollL.addView(layoutL);
                    layout2.addView(scrollL);
                    layoutR.addView(lays[0]);
                    layoutR.setPadding(pad, pad, pad, pad);
                    var scrollR = new android.widget.ScrollView(ctx);
                    scrollR.addView(layoutR);
                    layout2.addView(scrollR);
                    scrollL.setLayoutParams(lParams);
                    scrollR.setLayoutParams(rParams);
                    var maker = new mcpelib.gui.TextView(ctx, useNewGui);
                    maker.setText("\n© 2016-2017 Dark Tornado, All rights reserved.");
                    maker.setTextSize(13);
                    maker.setGravity(android.view.Gravity.CENTER);
                    maker.setPadding(pad, pad, pad, pad);
                    layoutR.addView(maker);
                    pad = dip2px(ctx, 10);
                    layout.setPadding(pad, dip2px(ctx, 15), pad, pad);
                    layout.addView(layout2);
                    window.setView(layout);
                    window.setCanScroll(false);
                    window.show();
                } catch (e) {
                    clientMessage(e + ", " + e.lineNumber);
                }
            }
        }));
    },
    save: function(name, msg) {
        try {
            var file = new java.io.File(sdcard + "/darkTornado/mcpeUtils/" + name + ".txt");
            var fos = new java.io.FileOutputStream(file);
            var str = new java.lang.String(msg);
            fos.write(str.getBytes());
            fos.close();
        } catch (e) {
            clientMessage(e + ", " + e.lineNumber);
        }
    },
    read: function(name) {
        try {
            var file = new java.io.File(sdcard + "/darkTornado/mcpeUtils/" + name + ".txt");
            if (!(file.exists())) return "";
            var fis = new java.io.FileInputStream(file);
            var isr = new java.io.InputStreamReader(fis);
            var br = new java.io.BufferedReader(isr);
            var str = br.readLine();
            var line = "";
            while ((line = br.readLine()) != null) {
                str += "\n" + line;
            }
            fis.close();
            isr.close();
            br.close();
            return str;
        } catch (e) {
            clientMessage(e + ", " + e.lineNumber);
        }
    },
    remove: function(name) {
        try {
            var file = new java.io.File(sdcard + "/darkTornado/mcpeUtils/" + name + ".txt");
            if (file.exists()) file.delete();
        } catch (e) {
            clientMessage(e + ", " + e.lineNumber);
        }
    },
    getDataFromServer: function(url) {
        try {
            var url = new java.net.URL(url);
            var con = url.openConnection();
            if (con != null) {
                con.setConnectTimeout(5000);
                con.setUseCaches(false);
                var isr = new java.io.InputStreamReader(con.getInputStream());
                var br = new java.io.BufferedReader(isr);
                var str = br.readLine();
                var line = "";
                while ((line = br.readLine()) != null) {
                    str += "\n" + line;
                }
                isr.close();
                br.close();
                con.disconnect();
            }
            return str.toString();
        } catch (e) {
            return null;
            Util.showError(e);
        }
    },
    updateDialog: function() {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    var dialog = new mcpelib.window.Dialog(ctx, useNewGui);
                    dialog.setTitle("New Version is Released!");
                    dialog.setMessage("New version of MCPE Utils is released. You can update from developer's blog.\nCurrent Version : " + version + "\nNewest Version : " + version2);
                    dialog.setNegativeButton("Close", null);
                    dialog.setPositiveButton("Go to Blog", new android.view.View.OnClickListener() {
                        onClick: function(v) {
                            var uri = new android.net.Uri.parse("http://blog.naver.com/dt3141592");
                            var link = new android.content.Intent(android.content.Intent.ACTION_VIEW, uri);
                            ctx.startActivity(link);
                        }
                    });
                    dialog.show();
                } catch (e) {
                    clientMessage(e + ", " + e.lineNumber);
                }
            }
        }));
    },
    isMulti: function() {
        if (Entity.getEntityTypeId(Player.getEntity()) == 0) return true;
        else return false;
    },
    doubleLinearLayout(views) {
        var lays = [];
        var pad = dip2px(ctx, 5);
        var mar = dip2px(ctx, 10);
        var btnParams = new android.widget.LinearLayout.LayoutParams(-1, -2, 1);
        btnParams.setMargins(mar, pad, mar, pad);
        for (var n = 0; n < views.length / 2; n++) {
            lays[n] = new android.widget.LinearLayout(ctx);
            lays[n].setOrientation(0);
            lays[n].setGravity(android.view.Gravity.CENTER);
            lays[n].setWeightSum(2);
            lays[n].setPadding(pad, pad, pad, pad);
            views[2 * n].setLayoutParams(btnParams);
            views[2 * n + 1].setLayoutParams(btnParams);
            lays[n].addView(views[2 * n]);
            lays[n].addView(views[2 * n + 1]);
        }
        return lays;
    }
};

const UtilLayout = {
    invenLayout: function() {
        try {
            var layout = new android.widget.LinearLayout(ctx);
            layout.setOrientation(1);
            var margin = new android.view.ViewGroup.MarginLayoutParams(-1, -2);
            var mar = dip2px(ctx, 5);
            margin.setMargins(mar, mar, mar, mar);
            var inv = new mcpelib.gui.Switch(ctx, useNewGui);
            inv.setText("Inventory Save");
            inv.setLayoutParams(new android.widget.LinearLayout.LayoutParams(margin));
            inv.setChecked(invSave);
            inv.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
                onCheckedChanged: function(swit, onoff) {
                    invSave = onoff;
                }
            }));
            layout.addView(inv.mv());
            var arm = new mcpelib.gui.Switch(ctx, useNewGui);
            arm.setText("Armor Slot Save");
            arm.setLayoutParams(new android.widget.LinearLayout.LayoutParams(margin));
            arm.setChecked(armorSave);
            arm.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
                onCheckedChanged: function(swit, onoff) {
                    armorSave = onoff;
                }
            }));
            layout.addView(arm.mv());
            var add = new mcpelib.gui.Button(ctx, useNewGui);
            add.setText("Give Item");
            add.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(v) {
                    Tool.giveItem();
                }
            }));
            var res = new mcpelib.gui.Button(ctx, useNewGui);
            res.setText("Reset Inv.");
            res.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(v) {
                    for (var n = 0; n < 55; n++)
                        Player.clearInventorySlot(n);
                }
            }));
            var enc = new mcpelib.gui.Button(ctx, useNewGui);
            enc.setText("Enchantment");
            enc.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(v) {
                    Tool.enchantDialog();
                }
            }));
            var ree = new mcpelib.gui.Button(ctx, useNewGui);
            ree.setText("Remove Enchantment");
            ree.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(v) {
                    var itemName = Player.getItemCustomName(Player.getSelectedSlotId());
                    Entity.setCarriedItem(Player.getEntity(), getCarriedItem(), Player.getCarriedItemCount(), Player.getCarriedItemData());
                    if (itemName != null) Player.setItemCustomName(Player.getSelectedSlotId(), itemName);
                }
            }));
            var name1 = new mcpelib.gui.Button(ctx, useNewGui);
            name1.setText("Change Item's Name");
            name1.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(v) {
                    Tool.inputItemName();
                }
            }));
            var name2 = new mcpelib.gui.Button(ctx, useNewGui);
            name2.setText("Reset Item's Name");
            name2.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(v) {
                    var slotId = Player.getSelectedSlotId();
                    var enchants = Player.getEnchantments(slotId);
                    Player.setInventorySlot(slotId, getCarriedItem(), Player.getCarriedItemCount(), Player.getCarriedItemData());
                    for each(var enc in enchants)
                    Player.enchant(slotId, enc.type, enc.level);
                }
            }));
            var lays = Util.doubleLinearLayout([add, res, enc, ree, name1, name2]);
            for (var n in lays)
                layout.addView(lays[n]);
            return layout;
        } catch (e) {
            clientMessage(e + ", " + e.lineNumber);
        }
    },
    worldLayout: function() {
        try {
            var layout = new android.widget.LinearLayout(ctx);
            layout.setOrientation(1);
            var margin = new android.view.ViewGroup.MarginLayoutParams(-1, -2);
            var mar = dip2px(ctx, 5);
            margin.setMargins(mar, mar, mar, mar);
            var sws = [];
            var menus = ["Sign Editor", "Single Command", "Flying", "Creative Mode", "Position Info.", "World Edit Window"];
            if (Level.getGameMode() == 0) menus[3] = "Survival Mode";
            var bools = [signEdit, useCmd, Player.canFly(), Boolean(Level.getGameMode()), Boolean(posWindow), Boolean(wWin)];
            for (var n in menus) {
                sws[n] = new mcpelib.gui.Switch(ctx, useNewGui);
                sws[n].setText(menus[n]);
                sws[n].setLayoutParams(new android.widget.LinearLayout.LayoutParams(margin));
                sws[n].setId(n);
                sws[n].setChecked(bools[n]);
                sws[n].setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
                    onCheckedChanged: function(swit, onoff) {
                        switch (swit.getId()) {
                            case 0:
                                signEdit = onoff;
                                break;
                            case 1:
                                useCmd = onoff;
                                break;
                            case 2:
                                Player.setCanFly(onoff);
                                break;
                            case 3:
                                if (onoff) {
                                    Level.setGameMode(1);
                                    sws[3].setText("Creative Mode");
                                } else {
                                    Level.setGameMode(0);
                                    sws[3].setText("Survival Mode");
                                }
                                break;
                            case 4:
                                if (onoff) {
                                    Tool.posInfoWindow();
                                } else if (posWindow != null) {
                                    posWindow.dismiss();
                                    posWindow = null;
                                    posText = null;
                                }
                                break;
                            case 5:
                                if (onoff) {
                                    if (wWin != null) wWin.close();
                                    WorldEdit.makeWindow();
                                } else if (wWin != null) {
                                    wWin.close();
                                    wWin = null;
                                }
                                break;
                        }
                    }
                }));
                layout.addView(sws[n].mv());
            }
            var tym = new mcpelib.gui.Button(ctx, useNewGui);
            tym.setText("Time Settings");
            tym.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(v) {
                    Tool.timeDialog();
                }
            }));
            var info = new mcpelib.gui.Button(ctx, useNewGui);
            info.setText("World Info.");
            info.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(v) {
                    showDialog("World Info.", "World Name : " + Level.getWorldName() + "\nWorld Folder : " + Level.getWorldDir());
                }
            }));
            var hh = new mcpelib.gui.Button(ctx, useNewGui);
            hh.setText("Health/Hunger");
            hh.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(v) {
                    Tool.healthDialog();
                }
            }));
            var tp = new mcpelib.gui.Button(ctx, useNewGui);
            tp.setText("Teleport");
            tp.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(v) {
                    Tool.inputPos();
                }
            }));
            var pot = new mcpelib.gui.Button(ctx, useNewGui);
            pot.setText("Potion Effect");
            pot.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(v) {
                    Tool.potionDialog();
                }
            }));
            var rep = new mcpelib.gui.Button(ctx, useNewGui);
            rep.setText("Remove Potion Effect");
            rep.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(v) {
                    Entity.removeAllEffects(Player.getEntity());
                }
            }));
            var wea = new mcpelib.gui.Button(ctx, useNewGui);
            wea.setText("Weather");
            wea.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(v) {
                    Tool.weatherDialog();
                }
            }));
            var cmd = new mcpelib.gui.Button(ctx, useNewGui);
            cmd.setText("Command List");
            cmd.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(v) {
                    showDialog("Command List", "/day : Set time to day.\n/night : Set time to night\n/time [time] : Set time to [time].\n/heal : Set health to 20.\n/health [health] : Set health to [health].\n/tp [x] [y] [z] : Teleport to the position.\n/give [Item Id] [Amount] [Item Damage] : Add item to inventory\n/gm [Game Mode] : Ghange Game Mode.\n/set home : Set home.\n/home : Go to the home.\n/help : See command list.");
                }
            }));
            var lays = Util.doubleLinearLayout([tym, info, hh, tp, pot, rep, wea, cmd]);
            for (var n in lays)
                layout.addView(lays[n]);
            return layout;
        } catch (e) {
            clientMessage(e + ", " + e.lineNumber);
        }
    },
    entityLayout: function() {
        try {
            var layout = new android.widget.LinearLayout(ctx);
            layout.setOrientation(1);
            var margin = new android.view.ViewGroup.MarginLayoutParams(-1, -2);
            var mar = dip2px(ctx, 5);
            margin.setMargins(mar, mar, mar, mar);
            var ae = new mcpelib.gui.Switch(ctx, useNewGui);
            ae.setText("Prevent Mob Spawning");
            ae.setLayoutParams(new android.widget.LinearLayout.LayoutParams(margin));
            ae.setChecked(antiEnt);
            ae.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
                onCheckedChanged: function(swit, onoff) {
                    antiEnt = onoff;
                }
            }));
            layout.addView(ae.mv());
            var sh = new mcpelib.gui.Switch(ctx, useNewGui);
            sh.setText("Show Entity Health");
            sh.setLayoutParams(new android.widget.LinearLayout.LayoutParams(margin));
            sh.setChecked(showHealth);
            sh.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
                onCheckedChanged: function(swit, onoff) {
                    showHealth = onoff;
                    if (!onoff) {
                        for each(var e in Entity.getAll()) {
                            if (!Player.isPlayer(e)) Entity.setNameTag(e, "");
                        }
                    }
                }
            }));
            layout.addView(sh.mv());
            var spa = new mcpelib.gui.Button(ctx, useNewGui);
            spa.setText("Spawn Entity");
            spa.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(v) {
                    Tool.entityList(true);
                }
            }));
            var rem = new mcpelib.gui.Button(ctx, useNewGui);
            rem.setText("Remove Entity");
            rem.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(v) {
                    Tool.entityList(false);
                }
            }));
            var rem2 = new mcpelib.gui.Button(ctx, useNewGui);
            rem2.setText("Remove All Entities");
            rem2.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(v) {
                    for each(var e in Entity.getAll()) {
                        if (!(Player.isPlayer(e) || Entity.getEntityTypeId(e) == 83)) Entity.remove(e);
                    }
                }
            }));
            var rid = new mcpelib.gui.Button(ctx, useNewGui);
            rid.setText("Ride Entity");
            rid.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(v) {
                    rideEnt = true;
                }
            }));
            var lays = Util.doubleLinearLayout([spa, rem, rem2, rid]);
            for (var n in lays)
                layout.addView(lays[n]);
            return layout;
        } catch (e) {
            clientMessage(e + ", " + e.lineNumber);
        }
    },
    elseLayout: function() {
        try {
            var layout = new android.widget.LinearLayout(ctx);
            layout.setOrientation(1);
            var margin = new android.view.ViewGroup.MarginLayoutParams(-1, -2);
            var pad = dip2px(ctx, 5);
            var mar = dip2px(ctx, 5);
            margin.setMargins(mar, mar, mar, mar);
            var sws = [];
            var menus = ["Hide My Name Tag", "Using Full Screen Keyboard", "Use Images That From Resource Pack", "Use New GUI", "Move Pos Info to Right"];
            var bools = [hideNameTag, !notFull, useResImage, useNewGui, posRight];
            for (var n in menus) {
                sws[n] = new mcpelib.gui.Switch(ctx, useNewGui);
                sws[n].setText(menus[n]);
                sws[n].setLayoutParams(new android.widget.LinearLayout.LayoutParams(margin));
                sws[n].setId(n);
                sws[n].setChecked(bools[n]);
                sws[n].setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
                    onCheckedChanged: function(swit, onoff) {
                        switch (swit.getId()) {
                            case 0:
                                hideNameTag = onoff;
                                if (onoff) Entity.setNameTag(Player.getEntity(), "");
                                else Entity.setNameTag(Player.getEntity(), ModPE.getUserName());
                                break;
                            case 1:
                                notFull = onoff;
                                break;
                            case 2:
                                useResImage = onoff;
                                Util.save("localImage", !onoff);
                                net.zhuoweizhang.mcpelauncher.ScriptManager.callScriptMethod("changeLocalImageSettingHook", [!onoff]);
                                break;
                            case 3:
                                useNewGui = onoff;
                                Util.save("newGui", onoff);
                                break;
                            case 4:
                                posRight = onoff;
                                break;
                        }
                    }
                }));
                layout.addView(sws[n].mv());
            }
            var gs = new mcpelib.gui.Button(ctx, useNewGui);
            gs.setText("Game Speed");
            gs.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(v) {
                    Tool.setGameSpeed();
                }
            }));
            var info = new mcpelib.gui.Button(ctx, useNewGui);
            info.setText("ModPE Info.");
            info.setOnClickListener(new android.view.View.OnClickListener({
                onClick: function(v) {
                    showDialog("ModPE Info.", "ModPE Name : MCPE Utils\nVersion : " + version + "\nNewest Version : " + version2 + "\nDeveloper : Dark Tornado\n\nThis ModPE Script was made for Single Playing. You can drag to move the \"Utils\" text.\nIf the background images is broken, please disable \"Use Images That From Resource Pack\"\n\nThis ModPE only works with \"MCPE Class Library\".\nNecessary Library Version : " + version3 + "\nCurrent Library Version : " + mcpelib.info.Version);
                }
            }));
            var lays = Util.doubleLinearLayout([info, gs]);
            for (var n in lays)
                layout.addView(lays[n]);
            return layout;
        } catch (e) {
            clientMessage(e + ", " + e.lineNumber);
        }
    }
};

const Tool = {
    signEditor: function(x, y, z) {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    var dialog = new mcpelib.window.Dialog(ctx, useNewGui);
                    var layout = new android.widget.LinearLayout(ctx);
                    layout.setOrientation(1);
                    var txt = [];
                    var margin = new android.view.ViewGroup.MarginLayoutParams(-1, -2);
                    var mar = dip2px(ctx, 3);
                    margin.setMargins(mar, mar, mar, mar);
                    for (var n = 0; n < 4; n++) {
                        txt[n] = new mcpelib.gui.EditText(ctx, useNewGui, notFull);
                        txt[n].setHint("Line Number " + (n + 1));
                        txt[n].setText(Level.getSignText(x, y, z, n) + "");
                        txt[n].setTextSize(18);
                        txt[n].setLayoutParams(new android.widget.LinearLayout.LayoutParams(margin));
                        layout.addView(txt[n]);
                    }
                    dialog.setView(layout);
                    dialog.setTitle("Sign Edit");
                    dialog.setNegativeButton("Cancel", null);
                    dialog.setPositiveButton("Save", new android.view.View.OnClickListener() {
                        onClick: function(v) {
                            for (var n = 0; n < 4; n++)
                                Level.setSignText(x, y, z, n, txt[n].getText().toString());
                        }
                    });
                    dialog.show();
                } catch (e) {
                    clientMessage(e + ", " + e.lineNumber);
                }
            }
        }));
    },
    giveItem: function() {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    var dialog = new mcpelib.window.Dialog(ctx, useNewGui);
                    var layout = new android.widget.LinearLayout(ctx);
                    layout.setOrientation(1);
                    var loc1 = new mcpelib.gui.TextView(ctx, useNewGui);
                    var loc2 = new mcpelib.gui.EditText(ctx, useNewGui, notFull);
                    var loc3 = new mcpelib.gui.TextView(ctx, useNewGui);
                    var loc4 = new mcpelib.gui.EditText(ctx, useNewGui, notFull);
                    var loc5 = new mcpelib.gui.TextView(ctx, useNewGui);
                    var loc6 = new mcpelib.gui.EditText(ctx, useNewGui, notFull);
                    loc1.setText("Item Id : ");
                    loc1.setTextSize(18);
                    loc2.setHint("Input Item Id...");
                    loc2.setInputType(number);
                    loc3.setText("Amount : ");
                    loc3.setTextSize(18);
                    loc4.setHint("Input Amount...");
                    loc4.setInputType(number | number2);
                    loc5.setText("Item Damage : ");
                    loc5.setTextSize(18);
                    loc6.setHint("Input Item Damage...");
                    loc6.setInputType(number);
                    layout.addView(loc1);
                    layout.addView(loc2);
                    layout.addView(loc3);
                    layout.addView(loc4);
                    layout.addView(loc5);
                    layout.addView(loc6);
                    dialog.setView(layout);
                    dialog.setTitle("Give Item");
                    dialog.setNegativeButton("Cancel", null);
                    dialog.setPositiveButton("Give", new android.view.View.OnClickListener() {
                        onClick: function(v) {
                            addItemInventory(loc2.getText(), loc4.getText(), loc6.getText());
                        }
                    });
                    dialog.show();
                } catch (e) {
                    clientMessage(e + ", " + e.lineNumber);
                }
            }
        }));
    },
    timeDialog: function() {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    var cache = timeLock;
                    var dialog = new mcpelib.window.Dialog(ctx, useNewGui);
                    var layout = new android.widget.LinearLayout(ctx);
                    layout.setOrientation(1);
                    var lock = new mcpelib.gui.Switch(ctx, useNewGui);
                    lock.setText("Time Lock");
                    lock.setChecked(timeLock);
                    lock.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
                        onCheckedChanged: function(swit, onoff) {
                            cache = onoff;
                        }
                    }));
                    layout.addView(lock.mv());
                    var loc1 = new mcpelib.gui.TextView(ctx, useNewGui);
                    var loc2 = new mcpelib.gui.EditText(ctx, useNewGui, notFull);
                    loc1.setText("Time : ");
                    loc1.setTextSize(18);
                    loc2.setHint("Input Time...");
                    loc2.setInputType(number | number2);
                    loc2.setText(Level.getTime() + "");
                    layout.addView(loc1);
                    layout.addView(loc2);
                    dialog.setView(layout);
                    dialog.setTitle("Time Settings");
                    dialog.setNegativeButton("Cancel", null);
                    dialog.setPositiveButton("Set", new android.view.View.OnClickListener() {
                        onClick: function(v) {
                            timeLock = cache;
                            if (timeLock) timeLockData = Number(loc2.getText());
                            Level.setTime(loc2.getText());
                        }
                    });
                    dialog.show();
                } catch (e) {
                    clientMessage(e + ", " + e.lineNumber);
                }
            }
        }));
    },
    posInfoWindow: function() {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    posWindow = new android.widget.PopupWindow();
                    posText = new mcpelib.gui.TextView(ctx);
                    if (posRight) posText.setGravity(android.view.Gravity.CENTER);
                    posText.setText("X : " + Math.round(Player.getX() - 0.5) + "\nY : " + Math.floor(Player.getY()) + "\nZ : " + Math.round(Player.getZ() - 0.5) + "\nYaw : " + Tool.getYaw() + "\nBiome : " + Level.getBiomeName(Player.getX(), Player.getZ()) + "\nTime : " + Tool.timeToString(Level.isNight()) + " (" + Level.getTime() + ")");
                    posText.setTextSize(15);
                    if (posRight) posText.setGravity(android.view.Gravity.RIGHT);
                    var pad = dip2px(ctx, 2);
                    posText.setPadding(pad, pad, pad, pad);
                    posWindow.setContentView(posText);
                    posWindow.setWidth(-2);
                    posWindow.setHeight(-2);
                    posWindow.setTouchable(false);
                    posWindow.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                    if (posRight) posWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 0, 0);
                    else posWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, 0, 0);
                } catch (e) {
                    clientMessage(e + ", " + e.lineNumber);
                }
            }
        }));
    },
    getYaw: function() {
        var yaw, sin, cos;
        yaw = Math.floor(getYaw());
        sin = -Math.sin(yaw / 180 * Math.PI);
        cos = Math.cos(yaw / 180 * Math.PI);
        if (Math.abs(sin) > Math.abs(cos)) {
            if (sin >= 0) return "X+";
            else return "X-";
        } else {
            if (cos >= 0) return "Z+";
            else return "Z-";
        }
    },
    timeToString: function(isNight) {
        if (isNight) return "Night";
        else return "Day";
    },
    updateText: function() {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    if (posWindow != null) posText.setText("X : " + Math.round(Player.getX() - 0.5) + "\nY : " + Math.floor(Player.getY()) + "\nZ : " + Math.round(Player.getZ() - 0.5) + "\nYaw : " + Tool.getYaw() + "\nBiome : " + Level.getBiomeName(Player.getX(), Player.getZ()) + "\nTime : " + Tool.timeToString(Level.isNight()) + " (" + Level.getTime() + ")");
                } catch (e) {
                    clientMessage(e);
                }
            }
        }));
    },
    enchantDialog: function() {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    var dialog = new mcpelib.window.Dialog(ctx, useNewGui);
                    var layout = new android.widget.LinearLayout(ctx);
                    layout.setOrientation(1);
                    var loc0 = new mcpelib.gui.TextView(ctx, useNewGui);
                    loc0.setText("Target Item : " + Item.getName(getCarriedItem(), Player.getCarriedItemData()));
                    loc0.setTextSize(18);
                    layout.addView(loc0);
                    var loc1 = new mcpelib.gui.TextView(ctx, useNewGui);
                    var loc2 = new mcpelib.gui.EditText(ctx, useNewGui, notFull);
                    loc1.setText("Power : ");
                    loc1.setTextSize(18);
                    loc2.setHint("Input Enchanment Power...");
                    loc2.setInputType(number | number2);
                    layout.addView(loc1);
                    layout.addView(loc2);
                    var types = ["Aqua Affinity", "Bane of Arthropods", "Blast Protection", "Depth Strider", "Efficiency", "Feather Falling", "Fire Aspect", "Fire Protection", "Flame", "Fortune", "Infinity", "Knockback", "Looting", "Luck of the Sea", "Lure", "Power", "Projectile Protection", "Protection", "Punch", "Respiration", "Sharpness", "Silk Touch", "Smite", "Thorns", "Unbreaking"];
                    var typeIds = [Enchantment.AQUA_AFFINITY, Enchantment.BANE_OF_ARTHROPODS, Enchantment.BLAST_PROTECTION, Enchantment.DEPTH_STRIDER, Enchantment.EFFICIENCY, Enchantment.FEATHER_FALLING, Enchantment.FIRE_ASPECT, Enchantment.FIRE_PROTECTION, Enchantment.FLAME, Enchantment.FORTUNE, Enchantment.INFINITY, Enchantment.KNOCKBACK, Enchantment.LOOTING, Enchantment.LUCK_OF_THE_SEA, Enchantment.LURE, Enchantment.POWER, Enchantment.PROJECTILE_PROTECTION, Enchantment.PROTECTION, Enchantment.PUNCH, Enchantment.RESPIRATION, Enchantment.SHARPNESS, Enchantment.SILK_TOUCH, Enchantment.SMITE, Enchantment.THORNS, Enchantment.UNBREAKING];
                    var typeId = [];
                    var checks = [];
                    for (var n in types) {
                        checks[n] = new mcpelib.gui.CheckBox(ctx);
                        checks[n].setText(types[n]);
                        checks[n].setId(n);
                        checks[n].setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
                            onCheckedChanged: function(check, onoff) {
                                if (onoff) typeId.push(typeIds[check.getId()]);
                                else typeId.splice(typeId.indexOf(typeIds[check.getId()]), 1);
                            }
                        }));
                        layout.addView(checks[n].mv());
                    }
                    dialog.setTitle("Enchantment");
                    dialog.setView(layout);
                    dialog.setNegativeButton("Cancel", null);
                    dialog.setPositiveButton("Enchant", new android.view.View.OnClickListener() {
                        onClick: function(v) {
                            var power = Number(loc2.getText());
                            if (Util.isMulti()) {
                                if (power > 5) power = 5;
                                else if (power < -100) power = -100;
                            }
                            for (var n in typeId)
                                Player.enchant(Player.getSelectedSlotId(), typeId[n], power);
                        }
                    });
                    dialog.show();
                } catch (e) {
                    clientMessage(e + ", " + e.lineNumber);
                }
            }
        }));
    },
    entityList: function(tf) {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    var dialog = new mcpelib.window.Dialog(ctx, useNewGui);
                    var layout = new android.widget.LinearLayout(ctx);
                    layout.setOrientation(1);
                    var btns = [];
                    var names = ["Chicken", "Cow", "Pig", "Sheep", "Wolf", "NPC", "Mooshroom", "Squid", "Rabbit", "Bat", "Iron Golem", "Snow Golem", "Osyellot", "Donkey", "Mule", "Horse", "Skeleton Horse", "Zombie Horse", "Zombie", "Creeper", "Skeleton", "Spider", "Pig Zombie", "Slime", "Endermen", "Silverfish", "Cave Spider", "Ghast", "Magma Cube", "Blaze", "Zombie NPC", "Witch", "Stray", "Husk", "Wither Skeleton", "Guardian", "Elder Guardian", "NPC", "Wither", "Tripod Camera", "Dropped Item", "Ignited TNT", "Falling Blocks", "Exp. Potion", "Exp.", "Fishing Rod", "Arrow", "Snow", "Egg", "Paint", "Minecart", "Fire Ball", "Throwable Potion", "Ender Pearl", "Leash Fence Knot", "Wither Skull", "Boat", "Lightning", "Small Fire Ball", "Camera", "Funnel Minecart", "TNT Minecart", "Chest Minecart"];
                    var entityIds = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 62, 64, 65, 66, 68, 69, 77, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 93, 94, 95, 96, 97, 98];
                    for (var n in names) {
                        btns[n] = new mcpelib.gui.Button(ctx, useNewGui);
                        btns[n].setText(names[n]);
                        btns[n].setId(n);
                        btns[n].setOnClickListener(new android.view.View.OnClickListener({
                            onClick: function(v) {
                                if (tf) {
                                    if (btnE != null) btnE.dismiss();
                                    Tool.entitySpawnButton();
                                    spawnMode = true;
                                    spawnData = entityIds[v.getId()];
                                } else {
                                    for each(var e in Entity.getAll()) {
                                        if (Entity.getEntityTypeId(e) == entityIds[v.getId()]) Entity.remove(e);
                                    }
                                }
                                dialog.close();
                            }
                        }));
                        layout.addView(btns[n]);
                    }
                    if (tf) dialog.setTitle("Spawn Entity");
                    else dialog.setTitle("Remove Entity");
                    dialog.setView(layout);
                    dialog.setNegativeButton("Cancel", null);
                    dialog.show();
                } catch (e) {
                    clientMessage(e + ", " + e.lineNumber);
                }
            }
        }));
    },
    entitySpawnButton: function() {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    btnE = new android.widget.PopupWindow();
                    var button = new mcpelib.gui.Button(ctx, useNewGui);
                    button.setText("Exit Spawn Mode");
                    button.setTextSize(13);
                    button.setOnClickListener(new android.view.View.OnClickListener({
                        onClick: function(v) {
                            spawnMode = false;
                            spawnData = null;
                            btnE.dismiss();
                            btnE = null;
                        }
                    }));
                    btnE.setContentView(button);
                    btnE.setWidth(dip2px(ctx, 140));
                    btnE.setHeight(dip2px(ctx, 40));
                    btnE.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
                    btnE.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER | android.view.Gravity.TOP, 0, dip2px(ctx, 20));
                } catch (e) {
                    clientMessage(e + ", " + e.lineNumber);
                }
            }
        }));
    },
    setGameSpeed: function() {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    var cache = timeLock;
                    var dialog = new mcpelib.window.Dialog(ctx, useNewGui);
                    var layout = new android.widget.LinearLayout(ctx);
                    layout.setOrientation(1);
                    var loc1 = new mcpelib.gui.TextView(ctx, useNewGui);
                    var loc2 = new mcpelib.gui.EditText(ctx, useNewGui, notFull);
                    loc1.setText("Game Speed : ");
                    loc1.setTextSize(18);
                    loc2.setHint("Input Game Speed...");
                    loc2.setInputType(number | number3);
                    layout.addView(loc1);
                    layout.addView(loc2);
                    dialog.setView(layout);
                    dialog.setTitle("Changing Game Speed");
                    dialog.setNegativeButton("Cancel", null);
                    dialog.setPositiveButton("Change", new android.view.View.OnClickListener() {
                        onClick: function(v) {
                            ModPE.setGameSpeed(Number(loc2.getText()) * 20);
                        }
                    });
                    dialog.show();
                } catch (e) {
                    clientMessage(e + ", " + e.lineNumber);
                }
            }
        }));
    },
    potionDialog: function() {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    var dialog = new mcpelib.window.Dialog(ctx, useNewGui);
                    var layout = new android.widget.LinearLayout(ctx);
                    layout.setOrientation(1);
                    var loc1 = new mcpelib.gui.TextView(ctx, useNewGui);
                    var loc2 = new mcpelib.gui.EditText(ctx, useNewGui, notFull);
                    loc1.setText("Time : ");
                    loc1.setTextSize(18);
                    loc2.setHint("Input Time...");
                    loc2.setInputType(number | number3);
                    layout.addView(loc1);
                    layout.addView(loc2);
                    var loc3 = new mcpelib.gui.TextView(ctx, useNewGui);
                    var loc4 = new mcpelib.gui.EditText(ctx, useNewGui, notFull);
                    loc3.setText("Power : ");
                    loc3.setTextSize(18);
                    loc4.setHint("Input Power...");
                    loc4.setInputType(number);
                    layout.addView(loc3);
                    layout.addView(loc4);
                    var types = ["Asaturation", "Absorption", "Health Boost", "Wither", "Poison", "Weakness", "Hunger", "Night Vision", "Blindness", "Invisibility", "Water Breathing", "Fire Resistance", "Damage Resistance", "Regeneration", "Confusion", "Jump", "Harm", "Heal", "Damage Boost", "Dig Slowdown", "Dig Speed", "Movement Slowdown", "Movement Speed"];
                    var typeIds = [MobEffect.saturation, MobEffect.absorption, MobEffect.healthBoost, MobEffect.wither, MobEffect.poison, MobEffect.weakness, MobEffect.hunger, MobEffect.nightVision, MobEffect.blindness, MobEffect.invisibility, MobEffect.waterBreathing, MobEffect.fireResistance, MobEffect.damageResistance, MobEffect.regeneration, MobEffect.confusion, MobEffect.jump, MobEffect.harm, MobEffect.heal, MobEffect.damageBoost, MobEffect.digSlowdown, MobEffect.digSpeed, MobEffect.movementSlowdown, MobEffect.movementSpeed];
                    var typeId = [];
                    var checks = [];
                    for (var n in types) {
                        checks[n] = new mcpelib.gui.CheckBox(ctx);
                        checks[n].setText(types[n]);
                        checks[n].setId(n);
                        checks[n].setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
                            onCheckedChanged: function(check, onoff) {
                                if (onoff) typeId.push(typeIds[check.getId()]);
                                else typeId.splice(typeId.indexOf(typeIds[check.getId()]), 1);
                            }
                        }));
                        layout.addView(checks[n].mv());
                    }
                    dialog.setTitle("Potion Effect");
                    dialog.setView(layout);
                    dialog.setNegativeButton("Cancel", null);
                    dialog.setPositiveButton("Give", new android.view.View.OnClickListener() {
                        onClick: function(v) {
                            for (var n in typeId)
                                Entity.addEffect(Player.getEntity(), typeId[n], 20 * Number(loc2.getText()), Number(loc4.getText()) - 1, true, false);
                        }
                    });
                    dialog.show();
                } catch (e) {
                    clientMessage(e + ", " + e.lineNumber);
                }
            }
        }));
    },
    healthDialog: function() {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    var cache = healthLock;
                    var cache2 = hungerLock;
                    var dialog = new mcpelib.window.Dialog(ctx, useNewGui);
                    var layout = new android.widget.LinearLayout(ctx);
                    layout.setOrientation(1);
                    var mar = dip2px(ctx, 4);
                    var margin = new android.view.ViewGroup.MarginLayoutParams(-1, -2);
                    margin.setMargins(mar, mar, mar, mar);
                    var lock = new mcpelib.gui.Switch(ctx, useNewGui);
                    lock.setText("Health Lock");
                    lock.setChecked(healthLock);
                    lock.setLayoutParams(new android.widget.LinearLayout.LayoutParams(margin));
                    lock.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
                        onCheckedChanged: function(swit, onoff) {
                            cache = onoff;
                        }
                    }));
                    layout.addView(lock.mv());
                    var lock2 = new mcpelib.gui.Switch(ctx, useNewGui);
                    lock2.setText("Hunger Lock");
                    lock2.setChecked(hungerLock);
                    lock2.setLayoutParams(new android.widget.LinearLayout.LayoutParams(margin));
                    lock2.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
                        onCheckedChanged: function(swit, onoff) {
                            cache2 = onoff;
                        }
                    }));
                    layout.addView(lock2.mv());
                    var loc1 = new mcpelib.gui.TextView(ctx, useNewGui);
                    var loc2 = new mcpelib.gui.EditText(ctx, useNewGui, notFull);
                    loc1.setText("Health : ");
                    loc1.setTextSize(18);
                    loc2.setHint("Input Health...");
                    loc2.setInputType(number | number2);
                    loc2.setText(Player.getHealth() + "");
                    layout.addView(loc1);
                    layout.addView(loc2);
                    var loc3 = new mcpelib.gui.TextView(ctx, useNewGui);
                    var loc4 = new mcpelib.gui.EditText(ctx, useNewGui, notFull);
                    loc3.setText("Hunger : ");
                    loc3.setTextSize(18);
                    loc4.setHint("Input Hunger...");
                    loc4.setInputType(number | number2);
                    loc4.setText(Player.getHunger() + "");
                    layout.addView(loc3);
                    layout.addView(loc4);
                    dialog.setView(layout);
                    dialog.setTitle("Health/Hunger Settings");
                    dialog.setNegativeButton("Cancel", null);
                    dialog.setPositiveButton("Set", new android.view.View.OnClickListener() {
                        onClick: function(v) {
                            healthLock = cache;
                            hungerLock = cache;
                            if (healthLock) healthLockData = Number(loc2.getText());
                            if (hungerLock) hungerLockData = Number(loc4.getText());
                            Player.setHealth(loc2.getText());
                            Player.setHunger(loc4.getText());
                        }
                    });
                    dialog.show();
                } catch (e) {
                    clientMessage(e + ", " + e.lineNumber);
                }
            }
        }));
    },
    inputPos: function() {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    var dialog = new mcpelib.window.Dialog(ctx, useNewGui);
                    var layout = new android.widget.LinearLayout(ctx);
                    layout.setOrientation(1);
                    var loc1 = new mcpelib.gui.TextView(ctx, useNewGui);
                    var loc2 = new mcpelib.gui.EditText(ctx, useNewGui, notFull);
                    var loc3 = new mcpelib.gui.TextView(ctx, useNewGui);
                    var loc4 = new mcpelib.gui.EditText(ctx, useNewGui, notFull);
                    var loc5 = new mcpelib.gui.TextView(ctx, useNewGui);
                    var loc6 = new mcpelib.gui.EditText(ctx, useNewGui, notFull);
                    loc1.setText("X : ");
                    loc1.setTextSize(18);
                    loc2.setHint("Input X...");
                    loc2.setInputType(number | number2 | number3);
                    loc3.setText("Y : ");
                    loc3.setTextSize(18);
                    loc4.setHint("Input Y...");
                    loc4.setInputType(number | number2 | number3);
                    loc5.setText("Z : ");
                    loc5.setTextSize(18);
                    loc6.setHint("Input Z...");
                    loc6.setInputType(number | number2 | number3);
                    layout.addView(loc1);
                    layout.addView(loc2);
                    layout.addView(loc3);
                    layout.addView(loc4);
                    layout.addView(loc5);
                    layout.addView(loc6);
                    dialog.setView(layout);
                    dialog.setTitle("Teleport");
                    dialog.setNegativeButton("Cancel", null);
                    dialog.setPositiveButton("TP", new android.view.View.OnClickListener() {
                        onClick: function(v) {
                            Entity.setPosition(Player.getEntity(), loc2.getText(), loc4.getText(), loc6.getText());
                        }
                    });
                    dialog.show();
                } catch (e) {
                    clientMessage(e + ", " + e.lineNumber);
                }
            }
        }));
    },
    weatherDialog: function() {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    var dialog = new mcpelib.window.Dialog(ctx, useNewGui);
                    var layout = new android.widget.LinearLayout(ctx);
                    layout.setOrientation(1);
                    var mar = dip2px(ctx, 5);
                    var margin = new android.view.ViewGroup.MarginLayoutParams(-1, -2);
                    margin.setMargins(mar, mar, mar, mar);
                    var rain = new mcpelib.gui.Switch(ctx, useNewGui);
                    rain.setText("Rain");
                    rain.setChecked(Boolean(Level.getRainLevel()));
                    rain.setLayoutParams(new android.widget.LinearLayout.LayoutParams(margin));
                    rain.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
                        onCheckedChanged: function(swit, onoff) {
                            if (onoff) Level.setRainLevel(1);
                            else Level.setRainLevel(0);
                        }
                    }));
                    layout.addView(rain.mv());
                    var ligh = new mcpelib.gui.Switch(ctx, useNewGui);
                    ligh.setText("Lightning");
                    ligh.setChecked(Boolean(Level.getLightningLevel()));
                    ligh.setLayoutParams(new android.widget.LinearLayout.LayoutParams(margin));
                    ligh.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
                        onCheckedChanged: function(swit, onoff) {
                            if (onoff) Level.setLightningLevel(1);
                            else Level.setLightningLevel(0);
                        }
                    }));
                    layout.addView(ligh.mv());
                    var rein = new mcpelib.gui.Switch(ctx, useNewGui);
                    rein.setText("Reinforce Lightning Power");
                    rein.setChecked(lightningReinforce);
                    rein.setLayoutParams(new android.widget.LinearLayout.LayoutParams(margin));
                    rein.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener({
                        onCheckedChanged: function(swit, onoff) {
                            lightningReinforce = onoff;
                        }
                    }));
                    layout.addView(rein.mv());
                    dialog.setView(layout);
                    dialog.setTitle("Weather");
                    dialog.setNegativeButton("Close", null);
                    dialog.show();
                } catch (e) {
                    clientMessage(e + ", " + e.lineNumber);
                }
            }
        }));
    },
    inputItemName: function() {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    var dialog = new mcpelib.window.Dialog(ctx, useNewGui);
                    var layout = new android.widget.LinearLayout(ctx);
                    layout.setOrientation(1);
                    var txt1 = new mcpelib.gui.TextView(ctx, useNewGui);
                    txt1.setText("Item Name : ");
                    txt1.setTextSize(18);
                    var txt2 = new mcpelib.gui.EditText(ctx, useNewGui);
                    txt2.setHint("Input Item's New Name...");
                    layout.addView(txt1);
                    layout.addView(txt2)
                    dialog.setView(layout);
                    dialog.setTitle("Change Item's Name");
                    dialog.setNegativeButton("Cancel", null);
                    dialog.setPositiveButton("Change", new android.view.View.OnClickListener({
                        onClick: function(v) {
                            Player.setItemCustomName(Player.getSelectedSlotId(), txt2.getText().toString());
                        }
                    }));
                    dialog.show();
                } catch (e) {
                    clientMessage(e + ", " + e.lineNumber);
                }
            }
        }));
    }

};

const WorldEdit = {
    makeWindow: function() {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    wWin = new mcpelib.window.FloatingWindow(ctx, useNewGui);
                    wWin.setTitle("World Edit");
                    wWin.addText("Point 1", function() {
                        w.input = 1;
                        utilMessage("Touch Point 1.");
                    });
                    wWin.addText("Point 2", function() {
                        w.input = 2;
                        utilMessage("Touch Point 2.");
                    });
                    wWin.addToggleText("Foot Block", function() {
                        w.f = true;
                        utilMessage("Foot Block on");
                    }, function() {
                        w.f = false;
                        utilMessage("Foot Block off");
                    }, w.f);
                    wWin.addToggleText("Replace", function() {
                        w.c = true;
                        utilMessage("Block Replacing on");
                    }, function() {
                        w.c = false;
                        utilMessage("Block Replacing off");
                    }, w.c);
                    wWin.addText("/set", function() {
                        WorldEdit.fixPosData();
                        WorldEdit.inputBlockId(0);
                    });
                    wWin.addText("/replace", function() {
                        WorldEdit.fixPosData();
                        WorldEdit.replaceDialog();
                    });
                    wWin.addText("/copy", function() {
                        WorldEdit.fixPosData();
                        new java.lang.Thread({
                            run: function() {
                                WorldEdit.copyTerrain();
                            }
                        }).start();
                    });
                    wWin.addText("/paste", function() {
                        new java.lang.Thread({
                            run: function() {
                                WorldEdit.pasteTerrain();
                            }
                        }).start();
                    });
                    wWin.addText("/circle", function() {
                        WorldEdit.inputBlockId(1);
                    });
                    wWin.addText("/circlef", function() {
                        WorldEdit.inputBlockId(2);
                    });
                    wWin.addText("/sphere", function() {
                        WorldEdit.inputBlockId(3);
                    });
                    wWin.addText("/spheref", function() {
                        WorldEdit.inputBlockId(4);
                    });
                    wWin.addText("/cylin", function() {
                        WorldEdit.inputBlockId(5);
                    });
                    wWin.addText("/no tree", function() {
                        WorldEdit.fixPosData();
                        for (var xx = w.x[2]; xx < w.x[3] + 1; xx++)
                            for (var yy = w.y[2]; yy < w.y[3] + 1; yy++)
                                for (var zz = w.z[2]; zz < w.z[3] + 1; zz++)
                                    if ([17, 18, 161, 162].indexOf(getTile(xx, yy, zz)) != -1) {
                                        setTile(xx, yy, zz, 0);
                                    }
                        utilMessage("Tree is Removed");
                    });
                    wWin.addText("/no water", function() {
                        WorldEdit.fixPosData();
                        for (var xx = w.x[2]; xx < w.x[3] + 1; xx++)
                            for (var yy = w.y[2]; yy < w.y[3] + 1; yy++)
                                for (var zz = w.z[2]; zz < w.z[3] + 1; zz++)
                                    if ([8, 9].indexOf(getTile(xx, yy, zz)) != -1) {
                                        setTile(xx, yy, zz, 0);
                                    }
                        utilMessage("Water is Removed");
                    });
                    wWin.addText("/remove", function() {
                        WorldEdit.fixPosData();
                        for (var xx = w.x[2]; xx < w.x[3] + 1; xx++)
                            for (var yy = w.y[2]; yy < w.y[3] + 1; yy++)
                                for (var zz = w.z[2]; zz < w.z[3] + 1; zz++)
                                    setTile(xx, yy, zz, 0);
                        utilMessage("Selected Terrain is removed.");
                    });
                    wWin.addText("Finish", function() {
                        if (wWin != null) {
                            wWin.close();
                            wWin = null;
                        }
                        utilMessage("World Edit off.");
                    });
                    wWin.setPosition(4, 0, 0);
                    wWin.show();
                } catch (e) {
                    clientMessage(e + ", " + e.lineNumber);
                }
            }
        }));
    },
    fixPosData: function() {
        w.x[2] = Math.min(w.x[0], w.x[1]);
        w.y[2] = Math.min(w.y[0], w.y[1]);
        w.z[2] = Math.min(w.z[0], w.z[1]);
        w.x[3] = Math.max(w.x[0], w.x[1]);
        w.y[3] = Math.max(w.y[0], w.y[1]);
        w.z[3] = Math.max(w.z[0], w.z[1]);
    },
    copyTerrain: function() {
        var n = 0,
            m = 0,
            o = 0;
        var nn = 0;
        w.b = [];
        w.bd = [];
        for (var xx = w.x[2]; xx < w.x[3] + 1; xx++) {
            w.b[n] = new Array(w.x[3] - w.x[2]);
            w.bd[n] = new Array(w.x[3] - w.x[2]);
            for (var yy = w.y[2]; yy < w.y[3] + 1; yy++) {
                w.b[n][m] = new Array(w.y[3] - w.y[2]);
                w.bd[n][m] = new Array(w.y[3] - w.y[2]);
                for (var zz = w.z[2]; zz < w.z[3] + 1; zz++) {
                    w.b[n][m][o] = [];
                    w.bd[n][m][o] = [];
                    w.b[n][m][o] = getTile(xx, yy, zz);
                    w.bd[n][m][o] = Level.getData(xx, yy, zz);
                    o++;
                    nn++;
                }
                w.zz = o;
                o = 0;
                m++;
            }
            w.yy = m;
            m = 0;
            n++;
        }
        w.xx = n;
        utilMessage(nn + " blocks were copied.");
    },
    pasteTerrain: function() {
        var nn = 0;
        for (var n = 0; n < w.xx; n++) {
            for (var m = 0; m < w.yy; m++) {
                for (var o = 0; o < w.zz; o++) {
                    setTile(w.x[0] + n, w.y[0] + m, w.z[0] + o, w.b[n][m][o], w.bd[n][m][o]);
                    nn++;
                }
            }
        }
        utilMessage(nn + " blocks were pasted.");
    },
    inputBlockId: function(type) {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    var titles = ["/set", "/circle", "/circlef", "/sphere", "/spheref", "/cylin"];
                    var dialog = new mcpelib.window.Dialog(ctx, useNewGui);
                    var layout = new android.widget.LinearLayout(ctx);
                    layout.setOrientation(1);
                    var loc1 = new mcpelib.gui.TextView(ctx, useNewGui);
                    var loc2 = new mcpelib.gui.EditText(ctx, useNewGui);
                    var loc3 = new mcpelib.gui.TextView(ctx, useNewGui);
                    var loc4 = new mcpelib.gui.EditText(ctx, useNewGui);
                    var loc5 = new mcpelib.gui.TextView(ctx, useNewGui);
                    var loc6 = new mcpelib.gui.EditText(ctx, useNewGui);
                    loc1.setText("Block Id : ");
                    loc1.setTextSize(18);
                    loc2.setHint("Input Block Id...");
                    loc2.setInputType(number);
                    loc3.setText("Block Damage : ");
                    loc3.setTextSize(18);
                    loc4.setHint("Input Block Damage...");
                    loc4.setInputType(number);
                    layout.addView(loc1);
                    layout.addView(loc2);
                    layout.addView(loc3);
                    layout.addView(loc4);
                    if (type > 0) {
                        loc5.setText("Radius : ");
                        loc5.setTextSize(18);
                        loc6.setHint("Input Radius...");
                        loc6.setInputType(number);
                        layout.addView(loc5);
                        layout.addView(loc6);
                    }
                    if (type == 5) {
                        var loc7 = new mcpelib.gui.TextView(ctx, useNewGui);
                        var loc8 = new mcpelib.gui.EditText(ctx, useNewGui);
                        loc7.setText("Height : ");
                        loc7.setTextSize(18);
                        loc8.setHint("Input Height...");
                        loc8.setInputType(number);
                        layout.addView(loc7);
                        layout.addView(loc8);
                    }
                    dialog.setView(layout);
                    dialog.setTitle(titles[type]);
                    dialog.setNegativeButton("Cancel", null);
                    dialog.setPositiveButton("OK", new android.view.View.OnClickListener() {
                        onClick: function(v) {
                            try {
                                fixPosData();
                                var b = Number(loc2.getText());
                                var bd = Number(loc4.getText());
                                var r = Number(loc6.getText());
                                switch (type) {
                                    case 0:
                                        for (var xx = w.x[2]; xx < w.x[3] + 1; xx++)
                                            for (var yy = w.y[2]; yy < w.y[3] + 1; yy++)
                                                for (var zz = w.z[2]; zz < w.z[3] + 1; zz++)
                                                    setTile(xx, yy, zz, b, bd);
                                        utilMessage("Filled with " + Item.getName(b, bd) + ".");
                                        break;
                                    case 1:
                                        for (var n = -r; n < r + 1; n++) {
                                            for (var m = -r; m < r + 1; m++) {
                                                var cir = Math.pow(n, 2) + Math.pow(m, 2);
                                                if (cir >= Math.pow(r - 1, 2) && cir <= Math.pow(r, 2))
                                                    setTile(w.x[0] + n, w.y[0], w.z[0] + m, b, bd);
                                            }
                                        }
                                        utilMessage("Circle is generated with " + Item.getName(b, bd) + ".");
                                        break;
                                    case 2:
                                        for (var n = -r; n < r + 1; n++) {
                                            for (var m = -r; m < r + 1; m++) {
                                                if (Math.pow(n, 2) + Math.pow(m, 2) <= Math.pow(r, 2))
                                                    setTile(w.x[0] + n, w.y[0], w.z[0] + m, b, bd);
                                            }
                                        }
                                        utilMessage("Filled circle is generated with " + Item.getName(b, bd) + ".");
                                        break;
                                    case 3:
                                        for (var n = -r; n < r + 1; n++) {
                                            for (var m = -r; m < r + 1; m++) {
                                                for (var o = -r; o < r + 1; o++) {
                                                    var sph = Math.pow(n, 2) + Math.pow(m, 2) + Math.pow(o, 2);
                                                    if (sph >= Math.pow(r - 1, 2) && sph <= Math.pow(r, 2))
                                                        setTile(w.x[0] + n, w.y[0] + m, w.z[0] + o, b, bd);
                                                }
                                            }
                                        }
                                        utilMessage("Sphere is generated with " + Item.getName(b, bd) + ".");
                                        break;
                                    case 4:
                                        for (var n = -r; n < r + 1; n++) {
                                            for (var m = -r; m < r + 1; m++) {
                                                for (var o = -r; o < r + 1; o++) {
                                                    if (Math.pow(n, 2) + Math.pow(m, 2) + Math.pow(o, 2) <= Math.pow(r, 2))
                                                        setTile(w.x[0] + n, w.y[0] + m, w.z[0] + o, b, bd);
                                                }
                                            }
                                        }
                                        utilMessage("Filled sphere is generated with " + Item.getName(b, bd) + ".");
                                        break;
                                    case 5:
                                        var h = Number(loc8.getText());
                                        for (var n = 0; n < h; n++) {
                                            for (var m = -r; m < r + 1; m++) {
                                                for (var o = -r; o < r + 1; o++) {
                                                    var cir = Math.pow(m, 2) + Math.pow(o, 2);
                                                    if (cir >= Math.pow(r - 1, 2) && cir <= Math.pow(r, 2))
                                                        setTile(w.x[0] + m, w.y[0] + n, w.z[0] + o, b, bd);
                                                }
                                            }
                                        }
                                        utilMessage("Cylinder is generated with " + Item.getName(b, bd) + ".");
                                        break;
                                }
                            } catch (e) {
                                clientMessage(e);
                            }
                        }
                    });
                    dialog.show();
                } catch (e) {
                    clientMessage(e + ", " + e.lineNumber);
                }
            }
        }));
    },
    replaceDialog: function() {
        ctx.runOnUiThread(new java.lang.Runnable({
            run: function() {
                try {
                    var dialog = new mcpelib.window.Dialog(ctx, useNewGui);
                    var layout = new android.widget.LinearLayout(ctx);
                    layout.setOrientation(1);
                    var loc1 = new mcpelib.gui.TextView(ctx, useNewGui);
                    var loc2 = new mcpelib.gui.EditText(ctx, useNewGui);
                    var loc3 = new mcpelib.gui.TextView(ctx, useNewGui);
                    var loc4 = new mcpelib.gui.EditText(ctx, useNewGui);
                    var loc5 = new mcpelib.gui.TextView(ctx, useNewGui);
                    var loc6 = new mcpelib.gui.EditText(ctx, useNewGui);
                    var loc7 = new mcpelib.gui.TextView(ctx, useNewGui);
                    var loc8 = new mcpelib.gui.EditText(ctx, useNewGui);
                    loc1.setText("Block Id : ");
                    loc1.setTextSize(18);
                    loc2.setHint("Input Block Id...");
                    loc2.setInputType(number);
                    loc3.setText("Block Damage : ");
                    loc3.setTextSize(18);
                    loc4.setHint("Input Block Damage...");
                    loc4.setInputType(number);
                    loc5.setText("\nBlock Id : ");
                    loc5.setTextSize(18);
                    loc6.setHint("Input Block Id...");
                    loc6.setInputType(number);
                    loc7.setText("Block Damage : ");
                    loc7.setTextSize(18);
                    loc8.setHint("Input Block Damage...");
                    loc8.setInputType(number);
                    layout.addView(loc1);
                    layout.addView(loc2);
                    layout.addView(loc3);
                    layout.addView(loc4);
                    layout.addView(loc5);
                    layout.addView(loc6);
                    layout.addView(loc7);
                    layout.addView(loc8);
                    dialog.setView(layout);
                    dialog.setTitle("/replace");
                    dialog.setNegativeButton("Cancel", null);
                    dialog.setPositiveButton("OK", new android.view.View.OnClickListener({
                        onClick: function(v) {
                            fixPosData();
                            var b1 = Number(loc2.getText());
                            var b2 = Number(loc6.getText());
                            if (loc4.getText().toString() == "") {
                                for (var xx = w.x[2]; xx < w.x[3] + 1; xx++)
                                    for (var yy = w.y[2]; yy < w.y[3] + 1; yy++)
                                        for (var zz = w.z[2]; zz < w.z[3] + 1; zz++)
                                            if (getTile(xx, yy, zz) == b1) {
                                                setTile(xx, yy, zz, b2);
                                            }
                            } else {
                                for (var xx = w.x[2]; xx < w.x[3] + 1; xx++)
                                    for (var yy = w.y[2]; yy < w.y[3] + 1; yy++)
                                        for (var zz = w.z[2]; zz < w.z[3] + 1; zz++)
                                            if (getTile(xx, yy, zz) == b1 && Level.getData(xx, yy, zz) == loc4.getText()) {
                                                setTile(xx, yy, zz, b2, loc8.getText());
                                            }
                            }
                            utilMessage(Item.getName(b1, loc4.getText()) + " is changed to " + Item.getName(b2, loc8.getText()) + ".");
                        }
                    }));
                    dialog.show();
                } catch (e) {
                    clientMessage(e + ", " + e.lineNumber);
                }
            }
        }));
    }
};

ModPE.getUserName = function() {
    try {
        var file = new java.io.File(sdcard + "/games/com.mojang/minecraftpe/options.txt");
        if (!(file.exists())) return "null";
        var fis = new java.io.FileInputStream(file);
        var isr = new java.io.InputStreamReader(fis);
        var br = new java.io.BufferedReader(isr);
        var str = br.readLine();
        var line = "";
        while ((line = br.readLine()) != null) {
            str += "\n" + line;
        }
        fis.close();
        isr.close();
        br.close();
        var nn = str.split("\n");
        var nnn = nn[0].split(":");
        return nnn[1].toString();
    } catch (e) {
        clientMessage(e + ", " + e.lineNumber);
    }
};
Player.getHealth = function() {
    return Entity.getHealth(Player.getEntity());
};
Level.isNight = function() {
    var nc1, nc2, nc3;
    nc1 = Level.getTime();
    try {
        var vers = ModPE.getMinecraftVersion().toString().split(".");
        if (Number(vers[1]) >= 12) nc2 = nc1 / 24000;
        else nc2 = nc1 / 19200;
    } catch (e) {
        nc2 = nc1 / 19200;
    }
    nc3 = nc2 - Math.floor(nc2);
    if (nc3 < 0.5) return false;
    else if (nc3 >= 0.5) return true;
};

var folder = new java.io.File(sdcard + "/darkTornado/mcpeUtils/");
folder.mkdirs();
var file = new java.io.File(sdcard + "/darkTornado/mcpeUtils/.nomedia");
file.createNewFile();
if (Util.read("localImage") == "true") useResImage = false;
if (Util.read("newGui") == "true") useNewGui = true;
var data = Util.getDataFromServer("https://www.dropbox.com/s/19fgjtxilnsrqn7/mcpeUtils.txt?dl=1");
if (data != null) {
    var cache = data.split("::");
    if (Number(cache[0]) > Number(version)) isAlerted = false;
    version2 = cache[0];
    if (cache[1] != "0") eval(cache[1] + "");
}

function dip2px(ctx, dips) {
    return Math.ceil(dips * ctx.getResources().getDisplayMetrics().density);
}

function utilMessage(msg) {
    if (msg.indexOf("\n") == -1) {
        clientMessage("§e[Utils] §7" + msg);
    } else {
        var msg2 = msg.toString().split("\n");
        clientMessage("§e[Utils] §7" + msg2[0]);
        for (var n = 1; n < msg2.length; n++)
            clientMessage(" §7" + msg2[n]);
    }
}

function newLevel() {
    try {
        if (Number(mcpelib.info.Version) < Number(version3)) utilMessage("MCPE Class Library's version is too low.\nPlease update library .");
    } catch (e) {
        utilMessage("Cannot find library.\nPlease enable \"MCPE Class Library.js\".");
    }
    Util.makeMainText();
}

function leaveGame() {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            if (btn != null) {
                btn.dismiss();
                btn = null;
            }
            if (posWindow != null) {
                posWindow.dismiss();
                posWindow = null;
                posText = null;
            }
            if (btnE != null) {
                btnE.dismiss();
                btnE = null;
            }
            if (wWin != null) {
                wWin.close();
                wWin = null;
            }
        }
    }));
}

function useItem(x, y, z, i, b, s, it, bd) {
    if (signEdit && (b == 63 || b == 68)) {
        Tool.signEditor(x, y, z);
        preventDefault();
    }
    if (spawnMode) {
        if (spawnData == 93) Level.spawnMob(x, y + 1, z, 93);
        else Level.spawnMob(x, y + 2.5, z, spawnData);
    }
    if (wWin != null) {
        if (w.input > 0) {
            utilMessage("Point " + w.input + " set.");
            w.x[w.input - 1] = x;
            w.y[w.input - 1] = y;
            w.z[w.input - 1] = z;
            w.input = 0;
            preventDefault();
        }
    }
    if (w.c) {
        if (i == 325 && it == 0) setTile(x, y, z, 0);
        else if (i == 325 && it == 8) setTile(x, y, z, 9);
        else if (i == 325 && it == 10) setTile(x, y, z, 11);
        else if (i == 259) setTile(x, y, z, 51);
        else if (i == 354) setTile(x, y, z, 92);
        else if (i == 338) setTile(x, y, z, 83);
        else if (i == 323) setTile(x, y, z, 63);
        else if (i < 256) setTile(x, y, z, i, it);
        preventDefault();
    }
}

function attackHook(a, v) {
    if (rideEnt) {
        Entity.rideAnimal(a, v);
        preventDefault();
        rideEnt = false;
    }
}

function procCmd(cmd) {
    var Data = cmd.split(" ");
    if (useCmd) {
        if (cmd == "day") {
            Level.setTime(1400);
            utilMessage("Time set to Day.");
        }
        if (cmd == "night") {
            Level.setTime(14000);
            utilMessage("Time set to Night.");
        }
        if (Data[0] == "time" && Data[1] != null) {
            Level.setTime(Data[1]);
            utilMessage("Time set to " + Data[1] + ".");
        }
        if (Data[0] == "tp" && Data[3] != null) {
            Entity.setPosition(Player.getEntity(), Data[1], Data[2], Data[3]);
            utilMessage("Teleported to [" + Data[1] + ", " + Data[2] + ", " + Data[3] + "].");
        }
        if (cmd == "heal") {
            Player.setHealth(20);
            utilMessage("Health set to 20.");
        }
        if (Data[0] == "health" && Data[1] != null) {
            Player.setHealth(Data[1]);
            utilMessage("Health set to " + Data[1] + ".");
        }
        if (Data[0] == "give" && Data[1] != null) {
            if (Data[3] != null) {
                addItemInventory(Data[1], Data[2], Data[3]);
                if (Data[2] > 1) utilMessage("Item Id " + Data[1] + ", Item Damage " + Data[3] + ", Amount " + Data[2] + " were given.");
                else utilMessage("Item Id " + Data[1] + ", Item Damage " + Data[3] + ", Amount " + Data[2] + " was given.");
            }
            if (Data[3] == null) {
                if (Data[2] == null) {
                    utilMessage("Item Id " + Data[1] + ", Amount 1 was given.");
                    addItemInventory(Data[1], 1, 0);
                }
                if (Data[2] <= 1) {
                    addItemInventory(Data[1], Data[2], 0)
                    utilMessage("Item Id " + Data[1] + ", Amount " + Data[2] + " was given.");
                } else if (Data[2] > 1) {
                    addItemInventory(Data[1], Data[2], 0)
                    utilMessage("Item Id " + Data[1] + ", Amount " + Data[2] + " were given.");
                }
            }
        }
        if (cmd == "gm 0") {
            Level.setGameMode(0);
            utilMessage("Set Game Mode to 0.");
        }
        if (cmd == "gm 1") {
            Level.setGameMode(1);
            utilMessage("Set Game Mode to 1.");
        }
        if (cmd == "set home") {
            homeData = [Player.getX(), Player.getY(), Player.getZ()];
            utilMessage("Home is set.");
        }
        if (cmd == "home") {
            Entity.setPosition(Player.getEntity(), homeData[0], homeData[1], homeData[2]);
            utilMessage("Teleported to the Home.");
        }
        if (cmd == "help") {
            utilMessage("<Command List>  /day, /night, /time [time], /heal, /health [health], /tp [x] [y] [z], /give [Item Id] [Amount] [Item Damage], /gm [Game Mode], /set home, /home\nYou can check more details with \"Command List\" Button.");
        }
    }
}

function modTick() {
    if (timeLock) Level.setTime(timeLockData);
    if (invSave || armorSave) {
        if (Player.getHealth() > 0) {
            if (isDied) {
                if (invSave) {
                    for (var n = 0; n < 36; n++)
                        Player.setInventorySlot(n, invenSaveData[n][0], invenSaveData[n][1], invenSaveData[n][2]);
                    utilMessage("Inventory was saved!");
                }
                if (armorSave) {
                    for (var n = 0; n < 4; n++)
                        Player.setArmorSlot(n, armorSaveData[n][0], armorSaveData[n][1]);
                    utilMessage("Armor Slots were saved!");
                }
                isDied = false;
            } else if (!isDied) {
                if (invSave) {
                    for (var n = 0; n < 36; n++)
                        invenSaveData[n] = [Player.getInventorySlot(n), Player.getInventorySlotCount(n), Player.getInventorySlotData(n)];
                }
                if (armorSave) {
                    for (var n = 0; n < 4; n++)
                        armorSaveData[n] = [Player.getArmorSlot(n), Player.getArmorSlotDamage(n)];
                }
            }
        } else if (Player.getHealth() <= 0) {
            isDied = true;
        }
    }
    if (anti > 0) anti--;
    if (posWindow != null) Tool.updateText();
    if (healthLock) Player.setHealth(healthLockData);
    if (hungerLock) Player.setHunger(hungerLockData);
    if (tick == 0) {
        modSecond(true);
        tick = 20;
    }
    if (tick > 0) {
        tick--;
    }
    if (w.f) setTile(Math.round(Player.getX() - 0.5), Player.getY() - 2, Math.round(Player.getZ() - 0.5), getCarriedItem(), Player.getCarriedItemData());
}

function modSecond(tf) {
    if (tf) {
        if (showHealth) {
            var names = ["Chicken", "Cow", "Pig", "Sheep", "Wolf", "NPC", "Mooshroom", "Squid", "Rabbit", "Bat", "Iron Golem", "Snow Golem", "Osyellot", "Donkey", "Mule", "Horse", "Skeleton Horse", "Zombie Horse", "Zombie", "Creeper", "Skeleton", "Spider", "Pig Zombie", "Slime", "Endermen", "Silverfish", "Cave Spider", "Ghast", "Magma Cube", "Blaze", "Zombie NPC", "Witch", "Stray", "Husk", "Wither Skeleton", "Guardian", "Elder Guardian", "NPC", "Wither"];
            var entityIds = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52];
            for each(var e in Entity.getAll()) {
                for (var n = 0; n < names.length; n++) {
                    if (Entity.getEntityTypeId(e) == entityIds[n]) Entity.setNameTag(e, names[n] + "(" + Entity.getHealth(e) + "/" + Entity.getMaxHealth(e) + ")");
                }
            }
        }
    }
}

function deathHook(m, v) {
    if (invSave && Player.getEntity() == v) {
        anti = 15;
    }
}

function entityAddedHook(e) {
    var type = Entity.getEntityTypeId(e);
    if (anti > 0 && type == 64) {
        Entity.remove(e);
    }
    if (lightningReinforce && type == 93) {
        explode(Entity.getX(e), Entity.getY(e), Entity.getZ(e), 4, true);
    }
}

function showDialog(title, msg) {
    ctx.runOnUiThread(new java.lang.Runnable({
        run: function() {
            try {
                var dialog = new mcpelib.window.Dialog(ctx, useNewGui);
                dialog.setTitle(title);
                dialog.setMessage(msg);
                dialog.setNegativeButton("Close", null);
                dialog.show();
            } catch (e) {
                clientMessage(e + ", " + e.lineNumber);
            }
        }
    }));
}

function checkInternet() {
    try {
        var cm = ctx.getSystemService(android.content.Context.CONNECTIVITY_SERVICE);
        if (cm.getNetworkInfo(cm.TYPE_WIFI).isConnected()) return true;
        else if (cm.getNetworkInfo(cm.TYPE_MOBILE).isConnected()) return true;
        else return false;
    } catch (e) {
        return false;
    }
}

function fixPosData() {
    w.x[2] = Math.min(w.x[0], w.x[1]);
    w.y[2] = Math.min(w.y[0], w.y[1]);
    w.z[2] = Math.min(w.z[0], w.z[1]);
    w.x[3] = Math.max(w.x[0], w.x[1]);
    w.y[3] = Math.max(w.y[0], w.y[1]);
    w.z[3] = Math.max(w.z[0], w.z[1]);
}


