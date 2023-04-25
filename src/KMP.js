function KMP(test,kalimat){
    var simpan1 = test.toLowerCase();
    var simpan2 = kalimat.toLowerCase();
    var indekshasil = [];
    var lensim1 = simpan1.length;
    var lensim2 = simpan2.length;
    var border = borderFunct(simpan1);
    var i = 0;
    var j = 0;
    while((lensim2-i)>=(lensim1-j))
    {
        if(simpan1.charAt(j) == simpan2.charAt(i))
        {
            i++;
            j++;
        }
        if(j==lensim1)
        {
            indekshasil.push(i-j);
            j = border[j-1];
        }
        else if(i<lensim2 && simpan1.charAt(j)!=simpan2.charAt(i))
        {
            if(j!=0)
            {
                j = border[j-1];
            }
            else
            {
                i++;
            }
        }
    }
    return indekshasil;
    
}
function cekarrSame(arr1,arr2){
    var cek = 0;
    for (let i = 0; i < arr1.length; i++) {
        if(arr1[i] == arr2[i]){
            cek += 1;
        }
    }
    if(cek == arr1.length){
        return true;
    }
    else{
        return false;
    }
}
function borderFunct(text){
    if(text.length == 0){
        return [];
    }
    var border = new Array(text.length);
    border[0] = 0;
    if(text.length == 1){
        return border;
    }
    else
    {
        var max = 1;
        while(max<text.length)
        {
            var simpan = 0;
            arrpref = [];
            for (let i = 0;i <= max ;i++) {//prefix
                arrpref.push(text[i]);
                arrsuf = [];
                var acuan;
                if(max-i == 0){
                    acuan = 1;
                }
                else{
                    acuan = max-i;
                }
                for(let j = max;j >= acuan;j--)//suffix
                {
                    arrsuf.splice(0,0,text[j]);
                }
                if(cekarrSame(arrpref,arrsuf))
                {
                    simpan = i+1;
                }
            }
            
            
            border[max] = simpan;
            max += 1;

        }
    }

    return border;
}
function tandaKMP(pat,txt){
    var indeks = KMP(pat,txt);
    var hasil = "";
    var indeksakhir = 0;
    for (let i = 0; i < indeks.length; i++) {
        hasil += txt.substring(indeksakhir,indeks[i]);
        hasil += "`"+pat+"`";
        indeksakhir = indeks[i]+pat.length;
    }
    hasil += txt.substring(indeksakhir,txt.length);
    return hasil;
}
var txt = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est labor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est labor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est labor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est labor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est labor .";
var pat = "labor";
var indeks =  KMP(pat, txt);
var hasil = tandaKMP(pat,txt);
console.log(hasil);



